import {useAppDispatch, useAppSelector} from "@app/store/store";
import React, {useContext} from "react";
import {WebsocketContext} from "@shared/providers/websocket/lib/context";
import {playSession} from "@features/session-stream/lib/playSession";
import {selectOneSession} from "@entities/session-upload/model/selectors";

const StartStreamingButton = () => {
  const dispatch = useAppDispatch();
  const [isReady, ,] = useContext(WebsocketContext);
  const session = useAppSelector(selectOneSession);
  console.log(session)

  const handleStart = async () => {
    if (session.bpm.length === 0 || session.uc.length === 0) {
      return;
    }
    playSession(session, dispatch);
  };

  return (
    <button
      // disabled={!isReady}
            onClick={handleStart}>
      Старт стрима
    </button>
  );
};

export default StartStreamingButton;