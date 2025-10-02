import React, {FC, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {validateFile} from "@features/start-session/lib/validation";

import startIcon from "@shared/assets/img/start.svg";
import stopIcon from "@shared/assets/img/stop.svg";
import {$apiUrl, CONTEXT_PAGE_URL, PATIENT_PICKER_PAGE_URL, STATUS_PAGE_URL} from "@shared/const/constants";
import {resetStream, startStreaming, stopStreaming} from "@entities/session-stream/model/sessionStreamSlice";
import ActionButton from "@shared/ui/action-button";
import {selectChosenPatient} from "@entities/patient/model/selectors";
import {useNavigate} from "react-router-dom";
import {selectCurrentPage} from "@entities/global/model/selectors";

const StartEmulationButton: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const streaming = useAppSelector((state) => state.sessionStream.streaming);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const patient = useAppSelector(selectChosenPatient);
  const currentPage = useAppSelector(selectCurrentPage);

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
  }
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
      const formData = new FormData();
      formData.append("archive", file);

      const res = await fetch(`${$apiUrl}/http/crud/extract-signals`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Ошибка при запуске эмуляции");
      }

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
      <ActionButton icon={streaming ? stopIcon : startIcon}
                    text={streaming ? "Стоп" : "Старт"}
                    type="button"
                    onClick={() => handleClick()}
      />
      <input ref={fileInputRef}
             type="file"
             accept=".zip"
             style={{display: "none"}}
             onChange={handleFile}
      />
    </>
  );
};

export default StartEmulationButton;
