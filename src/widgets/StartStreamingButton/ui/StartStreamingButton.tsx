import {useAppDispatch, useAppSelector} from "@app/store/store";
import React, {useContext} from "react";
import {WebsocketContext} from "@shared/providers/websocket/lib/context";
import {streamSession} from "@features/session-stream/lib/streamSession";
import {playSession} from "@features/session-stream/lib/playSession";
import {selectOneSession} from "@entities/session-upload/model/selectors";

const StartStreamingButton = () => {
  const dispatch = useAppDispatch();
  const [isReady, , safeSend] = useContext(WebsocketContext);
  const session = useAppSelector(selectOneSession);

  const handleStart = async () => {
    if (!session) {
      return;
    }
    playSession(session, dispatch);
  };

  return (
    <button disabled={!isReady} onClick={handleStart}>
      Старт стрима
    </button>
  );
};

export default StartStreamingButton;