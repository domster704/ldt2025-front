import React, {FC, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {validateFile} from "@features/start-session/lib/validation";

import startIcon from "@shared/assets/img/start.svg";
import stopIcon from "@shared/assets/img/stop.svg";
import {CONTEXT_PAGE_URL, PATIENT_PICKER_PAGE_URL, STATUS_PAGE_URL} from "@shared/const/constants";
import {resetStream, startStreaming, stopStreaming} from "@entities/session-stream/model/sessionStreamSlice";
import ActionButton from "@shared/ui/action-button";
import {selectChosenPatient} from "@entities/patient/model/selectors";
import {useNavigate} from "react-router-dom";
import {selectCurrentPage} from "@entities/global/model/selectors";
import {startEmulation} from "@entities/session-upload/api/startEmulationThunk";

/**
 * Кнопка для запуска и остановки эмуляции потока КТГ.
 *
 * ---
 * ### Основная логика:
 * - Если поток **уже запущен**:
 *   - Останавливает его через {@link stopStreaming}.
 *   - Полностью сбрасывает состояние через {@link resetStream}.
 *
 * - Если поток **не запущен**:
 *   1. Проверяет, выбран ли пациент:
 *      - Если нет — перенаправляет на страницу выбора пациента ({@link PATIENT_PICKER_PAGE_URL}).
 *   2. Проверяет, находимся ли мы на странице статуса или контекста:
 *      - Если нет — автоматически переходит на {@link STATUS_PAGE_URL}.
 *   3. Открывает скрытый `<input type="file">` для загрузки архива `.zip`.
 *
 * - После выбора файла:
 *   - Проверяет расширение (`.zip`) с помощью {@link validateFile}.
 *   - Отправляет файл на сервер (`/http/crud/extract-signals`) через `FormData`.
 *   - Если запрос успешен → запускает поток через {@link startStreaming}.
 *   - Если ошибка → останавливает и сбрасывает поток.
 *
 * ---
 * ### Состояния:
 * - `streaming: boolean` — идёт ли сейчас эмуляция.
 * - `patient` — выбранный пациент (если нет — переход на выбор пациента).
 * - `currentPage` — текущая страница (нужна для проверки, где запускать эмуляцию).
 *
 * ---
 * @component
 * @example
 * ```tsx
 * import StartEmulationButton from "@features/start-session/ui/StartEmulationButton";
 *
 * const FooterActionsPanel = () => (
 *   <nav>
 *     <StartEmulationButton />
 *   </nav>
 * );
 * ```
 */
const StartEmulationButton: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const streaming = useAppSelector((state) => state.sessionStream.streaming);
  const patient = useAppSelector(selectChosenPatient);
  const currentPage = useAppSelector(selectCurrentPage);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /** Обработчик клика по кнопке "Старт/Стоп" */
  const handleClick = () => {
    if (streaming) {
      dispatch(stopStreaming());
      dispatch(resetStream());
      return;
    }

    if (!patient) {
      navigate(PATIENT_PICKER_PAGE_URL);
      return;
    }

    if (!currentPage.startsWith(STATUS_PAGE_URL) && !currentPage.startsWith(CONTEXT_PAGE_URL)) {
      navigate(STATUS_PAGE_URL);
      return;
    }

    fileInputRef.current?.click();
  };

  /** Обработчик выбора файла (.zip) для запуска эмуляции */
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (!validateFile(file)) {
      alert("Поддерживаются только .zip файлы");
      return;
    }

    try {
      await dispatch(startEmulation(file)).unwrap();
      dispatch(startStreaming());
    } catch (err) {
      dispatch(stopStreaming());
      dispatch(resetStream());
      console.error(err);
    } finally {
      e.target.value = "";
    }
  };

  return (
    <>
      <ActionButton
        icon={streaming ? stopIcon : startIcon}
        text={streaming ? "Стоп" : "Старт"}
        type="button"
        onClick={() => handleClick()}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".zip"
        style={{display: "none"}}
        onChange={handleFile}
      />
    </>
  );
};

export default StartEmulationButton;
