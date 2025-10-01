import React, {FC, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {validateFile} from "@features/start-session/lib/validation";

import startIcon from "@shared/assets/img/start.svg";
import OpenPageButton from "@shared/ui/open-page-button";
import {HOME_PAGE_URL, PATIENT_PICKER_PAGE_URL} from "@shared/const/constants";
import {startStreaming} from "@entities/session-stream/model/sessionStreamSlice";
import ActionButton from "@shared/ui/action-button";
import {selectChosenPatient} from "@entities/patient/model/selectors";
import {useNavigate} from "react-router-dom";

const StartEmulationButton: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const patient = useAppSelector(selectChosenPatient);

  const handleClick = () => {
    fileInputRef.current?.click();
  }

  const handleStartEmulationClick = async () => {
    if (!patient) {
      navigate(PATIENT_PICKER_PAGE_URL);
      return;
    }

    navigate(HOME_PAGE_URL);
    await runEmulation();
  }

  const runEmulation = async () => {
    dispatch(startStreaming());
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

    await runEmulation();
    // const resultAction = await dispatch(fetchMonitoringSession(file));
    // if (fetchMonitoringSession.fulfilled.match(resultAction)) {
    //   const newSession = resultAction.payload;
    //   dispatch(playSessionEffect(newSession));
    // }
  };

  return (
    <>
      <ActionButton icon={startIcon}
                    text="Старт"
                    type="button"
                    onClick={async () => await handleStartEmulationClick()}
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
