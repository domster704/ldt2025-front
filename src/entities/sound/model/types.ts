/**
 * Перечисление типов звуков, используемых в приложении.
 *
 * - `SensorShift` — звук при смещении датчика.
 * - `Warning` — звук при ухудшении состояния.
 * - `Critical` — звук при критических показателях.
 */
export enum SoundType {
  SensorShift = "sensorShift",
  Warning = "warning",
  Critical = "critical",
}

/**
 * Модель звука, доступного в приложении.
 *
 * ### Поля:
 * - `id` — уникальный идентификатор звука ({@link SoundType}).
 * - `name` — человекочитаемое название (отображается в UI).
 * - `fileName` — путь или имя звукового файла (например, mp3).
 * - `enabled` — включён ли звук.
 * - `custom?` — необязательный флаг, указывающий, заменял ли пользователь стандартный звук.
 *
 * ### Используется в:
 * - Redux-срезе {@link soundSlice}.
 * - UI-компонентах для управления звуками (например, SoundManager).
 */
export interface Sound {
  id: SoundType;
  name: string;
  fileName: string;
  enabled: boolean;
  custom?: boolean;
}
