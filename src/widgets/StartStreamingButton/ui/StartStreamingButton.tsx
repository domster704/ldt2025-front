import {useAppDispatch, useAppSelector} from "@app/store/store";
import React, {useContext} from "react";
import {WebsocketContext} from "@shared/providers/websocket/lib/context";
import {streamSession} from "@features/session-stream/lib/streamSession";
import {playSession} from "@features/session-stream/lib/playSession";

const StartStreamingButton = () => {
  const dispatch = useAppDispatch();
  const [isReady, , safeSend] = useContext(WebsocketContext);
  const sessions = useAppSelector(state => state.upload.sessions);

  const handleStart = async () => {
    if (sessions.length === 0) return;
    const session = sessions[sessions.length - 1];
    playSession(session, dispatch);
  };

  return (
    <button disabled={!isReady} onClick={handleStart}>
      Старт стрима
    </button>
  );
};

export default StartStreamingButton;