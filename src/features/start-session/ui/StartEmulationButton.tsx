import React, {FC, useRef} from "react";
import {useAppDispatch} from "@app/store/store";
import {validateFile} from "@features/start-session/lib/validation";

import startIcon from "@shared/assets/img/start.svg";
import OpenPageButton from "@shared/ui/open-page-button";
import {HOME_PAGE_URL} from "@shared/const/constants";
import {resetStream, startStreaming} from "@entities/session-stream/model/sessionStreamSlice";

const StartEmulationButton: FC = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
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
      <OpenPageButton icon={startIcon}
                      page={HOME_PAGE_URL}
                      text="Старт"
                      type="button"
                      onClick={async () => await runEmulation()}
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
