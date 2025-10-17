Коротко суть: **разделяй 4 слоя данных** и веди их по конвейеру «API → DTO (store) → Domain (бизнес) → ViewModel (UI)».
Сейчас у тебя слои есть, но маппинг размазан по slice — это делает код хрупким и плохо тестируемым.

Ниже — «как правильно» + готовые куски кода под твой проект.

---

# Зачем делить на слои

* **API** — «как отдал бэкенд». Может меняться, ломаться, содержать странности.
* **DTO** — «как мы храним в Redux». Только **сериализуемые** типы, минимум логики, никаких `Date`.
* **Domain** — «как мы работаем в бизнес-логике». Тут можно `Date`, enum’ы, вычисления, удобные поля.
* **ViewModel** — «как удобно рисовать в UI» (например, строки для таблицы, подписи, локализованные даты).

Разделение даёт:

* изоляцию от изменений API (анти-коррупционный слой),
* сериализуемый store (с `serializableCheck: true` у тебя это критично),
* простые для тестов **чистые функции-адаптеры**,
* производительный UI (тяжёлые преобразования — в селекторах с мемоизацией).

---

# Конвейер данных

```
fetch → validate(API) → mapApiToDto → put to store
                                  ↓
                          selector → mapDtoToDomain → (опц.) mapDomainToVM → UI
```

---

# Где лежит что (структура)

```
entities/ctg-history/
  api/
    types.ts         // типы API-ответов (как есть, от сервера)
    schemas.ts       // Zod-схемы валидации API
    client.ts        // функции fetch'а (опц. общая утилка)
  model/
    types.ts         // DTO и Domain-типы
    adapters.ts      // ЧИСТЫЕ ФУНКЦИИ: mapApiToDto, mapDtoToDomain, mapDomainToVm
    selectors.ts     // селекторы, которые вызывают адаптеры (memoized)
    ctgHistorySlice.ts
```

---

# Правила по каждому слою

**API-тип**

* точная копия сервера (строки, числа, `timestamp` строкой и т.п.).
* ничего не додумываем, не конвертим.

**DTO**

* сериализуемое; `Date` → `string`; enum’ы лучше строками, но **валидные** (приводим на этапе маппинга).
* никаких UI-полей.

**Domain**

* удобные типы: `Date`, перечисления `CTGStatus`, склеенные/вычисленные поля.
* сюда не кладём «костыли для UI».

**VM (опционально)**

* красиво отформатированные строки (даты, единицы, лейблы), иконки, цвета — всё для компонента.

---

# Конкретная реализация для ctg-history

## 1) API: типы и валидация

`entities/ctg-history/api/types.ts` (у тебя уже есть, привожу для контекста):

```ts
// как отдаёт сервер
export interface CTGResultAPI {
  ctg_id: number;
  gest_age: string;
  bpm: number;
  uc: number;
  figo: string;
  figo_prognosis: string;
  // ...прочее...
  timestamp: string; // ISO строка
}

export interface CTGHistoryAPI {
  id: number | null;
  dir_path: string;
  archive_path: string | null;
  result?: CTGResultAPI;
  graph: { id: string; bpm: { time_sec: number; value: number }[]; uc: { time_sec: number; value: number }[] };
}
```

`entities/ctg-history/api/schemas.ts` (валидация через zod, по аналогии с твоим StreamDataSchema):

```ts
import {z} from "zod";

export const CTGResultAPISchema = z.object({
  ctg_id: z.number(),
  gest_age: z.string(),
  bpm: z.number(),
  uc: z.number(),
  figo: z.string(),
  figo_prognosis: z.string().nullable().optional(),
  // ... все поля ...
  timestamp: z.string(),
});

export const GraphPointAPISchema = z.object({ time_sec: z.number(), value: z.number() });
export const GraphAPISchema = z.object({
  id: z.string(),
  bpm: z.array(GraphPointAPISchema),
  uc: z.array(GraphPointAPISchema),
});

export const CTGHistoryAPISchema = z.object({
  id: z.number().nullable(),
  dir_path: z.string(),
  archive_path: z.string().nullable(),
  result: CTGResultAPISchema.optional(),
  graph: GraphAPISchema,
});
```

## 2) DTO и Domain-типы

`entities/ctg-history/model/types.ts` — у тебя уже хорошо:

* DTO: `CTGHistoryDTO` (`timestamp` строкой), enum’ы сведены к `CTGStatus`, `figo_prognosis` может быть `null`;
* Domain: `CTGHistory` с `timestamp: Date`.
  Это оставить.

## 3) Адаптеры (главное)

`entities/ctg-history/model/adapters.ts` — **добавляем мапперы**:

```ts
import {CTGStatus, figoToCTGStatus} from "@shared/const/ctgColors";
import {CTGHistoryAPI, CTGResultAPI} from "../api/types";
import {CTGHistoryDTO, CTGResultDTO, CTGHistory} from "./types";

// 1) API -> DTO (сериализуемо, безопасно)
export function mapResultApiToDto(api?: CTGResultAPI): CTGResultDTO | undefined {
  if (!api) return undefined;

  const figo = figoToCTGStatus[api.figo] ?? CTGStatus.Normal;
  const figo_prognosis =
    api.figo_prognosis ? (figoToCTGStatus[api.figo_prognosis] ?? null) : null;

  return {
    ...api,
    figo,
    figo_prognosis,
    // NOTE: timestamp оставляем строкой в DTO
  };
}

export function mapHistoryApiToDto(api: CTGHistoryAPI): CTGHistoryDTO {
  return {
    id: api.id ?? 0, // guard для selectId
    dir_path: api.dir_path,
    archive_path: api.archive_path ?? null,
    graph: api.graph,
    result: mapResultApiToDto(api.result),
  };
}

// 2) DTO -> Domain (удобно в бизнес-логике и UI)
export function mapResultDtoToDomain(dto?: CTGResultDTO) {
  if (!dto) {
    return {
      timestamp: new Date(),
      figo: null,
      figo_prognosis: null,
      bpm: 0,
      uc: 0,
    } as any; // минимальный safe-объект для домена
  }
  return {
    ...dto,
    timestamp: new Date(dto.timestamp),
  };
}

export function mapHistoryDtoToDomain(dto: CTGHistoryDTO): CTGHistory {
  return {
    ...dto,
    result: mapResultDtoToDomain(dto.result),
  };
}
```

> Где теперь ставить дефолты (mockGraph и пр.)?
> — В адаптерах, если это **нормализация входа**; либо в UI-слое, если это **placeholders для визуализации**. Сейчас у тебя мок подставляется в slice — лучше перенести в адаптер `mapHistoryApiToDto` (если действительно надо именно на уровне данных).

## 4) Подключаем адаптеры в thunk/slice

`entities/ctg-history/api/ctgHistoryThunk.ts`:

```ts
import {createAsyncThunk} from "@reduxjs/toolkit";
import {$apiUrl} from "@shared/const/constants";
import {CTGHistoryAPI} from "../model/types?"; // или из api/types
import {mapHistoryApiToDto} from "../model/adapters";

export const fetchAllCTGHistory = createAsyncThunk(
  'ctg/fetchAllCTGHistory',
  async (patientId: number) => {
    const res = await fetch(`${$apiUrl}/http/crud/ctg_histories?patient=${patientId}`);
    if (!res.ok) throw new Error(await res.text());
    const json = await res.json() as CTGHistoryAPI[];
    // API → DTO на вход в slice
    return json.map(mapHistoryApiToDto);
  }
);
```

`entities/ctg-history/model/ctgHistorySlice.ts` — slice теперь чистый:

```ts
import {createSlice} from "@reduxjs/toolkit";
import {ctgHistoryAdapter} from "./adapters";
import {fetchAllCTGHistory, fetchAllCTGHistoryAnalysis} from "../api/ctgHistoryThunk";

const initialState = {
  items: ctgHistoryAdapter.getInitialState(),
  analysis: null as string | null
};

const ctgHistorySlice = createSlice({
  name: 'ctgHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCTGHistory.fulfilled, (state, action) => {
        ctgHistoryAdapter.setAll(state.items, action.payload); // уже DTO
      })
      .addCase(fetchAllCTGHistoryAnalysis.fulfilled, (state, action) => {
        state.analysis = action.payload.analysis;
      })
      .addCase(fetchAllCTGHistoryAnalysis.rejected, (state) => {
        state.analysis = null;
      });
  },
});
```

## 5) Селекторы: DTO → Domain/VM

`entities/ctg-history/model/selectors.ts`:

* Оставляем в хранилище **DTO**, а в селекторах маппим в **Domain** мемоизировано.
* Ты это уже делаешь — просто используй наши чистые `mapHistoryDtoToDomain`.

```ts
import {createAppSelector, RootState} from "@app/store/store";
import {ctgHistoryAdapter} from "./adapters";
import {mapHistoryDtoToDomain} from "./adapters";

const base = (s: RootState) => s.ctgHistory.items;
const selectors = ctgHistoryAdapter.getSelectors();

export const selectAllCTGHistory = createAppSelector(base, (state) =>
  selectors.selectAll(state)
    .map(mapHistoryDtoToDomain)
    .sort((a, b) => (a.result?.timestamp?.getTime() ?? 0) - (b.result?.timestamp?.getTime() ?? 0))
);

export const selectCTGHistoryById = (state: RootState, id: number) => {
  const dto = selectors.selectById(state.ctgHistory.items, id);
  return dto ? mapHistoryDtoToDomain(dto) : undefined;
};
```

---

# Конвенции именования

* **`FooAPI`** — ровно как на сервере.
* **`FooDTO`** — сериализуемо, очищено/сопоставлено с enum’ами.
* **`Foo`** — domain (Date, enum, вычисления).
* **`FooVM`** — строковые подписи, формат даты, цвета, иконки.

Файлы:

* `api/types.ts`, `api/schemas.ts`
* `model/types.ts` (DTO+Domain), `model/adapters.ts` (мапперы), `model/selectors.ts` (мемоизированные преобразования).

---

# Где валидировать и где ставить дефолты

* **Валидация**: на **границе API** (`schemas.ts` → `safeParse`).
  Если провал — лог + throw, чтобы не тащить мусор внутрь.
* **Нормализация/дефолты**: в **mapApiToDto** (например, пустые строки → `null`, неожиданные figo → `CTGStatus.Normal`).
* **Форматирование для UI** (дата в строку, единицы измерения) — **только в VM** / компонентах.

---

# Что хранить в Redux

* Храни **DTO**, не `Domain`. Причины:

    * сериализуемость (у тебя включён `serializableCheck`),
    * кредит доверия данным (никаких случайных `Date`/функций).

---

# Тесты (обязательны)

Тестируй **только адаптеры** — быстрые unit’ы, покрывают большую часть рисков:

```ts
// adapters.spec.ts
it('mapResultApiToDto converts figo strings to CTGStatus', () => {
  expect(mapResultApiToDto({ ...api, figo: "Нормальное" })!.figo).toBe(CTGStatus.Normal);
  expect(mapResultApiToDto({ ...api, figo: "???" })!.figo).toBe(CTGStatus.Normal); // fallback
});

it('mapHistoryDtoToDomain converts timestamp to Date', () => {
  const domain = mapHistoryDtoToDomain(dto);
  expect(domain.result.timestamp).toBeInstanceOf(Date);
});
```

---

# Частые ошибки и как не надо

* ❌ Маппить API → Domain прямо в slice/reducer.
  ✅ Только **чистые адаптеры**, slice — «положи как пришло».
* ❌ Ставить UI-заглушки в DTO (например, “—” вместо `null`).
  ✅ Заглушки — только в ViewModel/UI.
* ❌ Хранить `Date` в Redux.
  ✅ Только строки в DTO, `Date` в Domain (в селекторе).
* ❌ Разбросанные по коду `as any`.
  ✅ Zod-схемы и строгие мапперы с понятными fallback’ами.

---

# Пошаговая миграция у тебя

1. Создай `api/schemas.ts` для ctg-history и другие сущности (по аналогии со StreamDataSchema).
2. В `model/adapters.ts` реализуй `mapApiToDto`, `mapDtoToDomain`.
3. Обнови thunk’и: после `fetch` → `parse` → `mapApiToDto` → `return`.
4. Убери конвертацию из `ctgHistorySlice` → просто `setAll`.
5. В `selectors.ts` используй `mapDtoToDomain`.
6. Добавь unit-тесты на адаптеры.

---

Если хочешь — накину такой же каркас для `patient` и `session-stream` (включая нормализацию сообщений WS и хранение только DTO, а в домене считать STV/цвета/FIGO).
