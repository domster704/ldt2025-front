import React, {FC, useRef} from "react";
import {useAppDispatch} from "@app/store/store";
import {validateFile} from "@features/start-session/lib/validation";
import {fetchMonitoringSession} from "@entities/session-upload/api/sessionUploadThunk";

import startIcon from "@shared/assets/img/start.svg";
import {playSessionEffect} from "@features/session-stream";
import OpenPageButton from "@shared/ui/open-page-button";
import {HOME_PAGE_URL} from "@shared/const/constants";

const StartEmulationButton: FC = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
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

    const resultAction = await dispatch(fetchMonitoringSession(file));
    if (fetchMonitoringSession.fulfilled.match(resultAction)) {
      const newSession = resultAction.payload;
      console.log(newSession)
      dispatch(playSessionEffect(newSession));
    }
  };

  return (
    <>
      <OpenPageButton icon={startIcon}
                      page={HOME_PAGE_URL}
                      text="Старт"
                      type="button"
                      onClick={handleClick}
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
