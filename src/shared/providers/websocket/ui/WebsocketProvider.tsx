import React, {FC, useEffect, useRef, useState} from "react";
import {WebsocketContext} from "@shared/providers/websocket/lib/context";

interface WebsocketProviderProps {
  children: React.ReactNode;
}

export const WebsocketProvider: FC<WebsocketProviderProps> = ({children}) => {
  const [isReady, setIsReady] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");

    socket.onopen = () => {
      setIsReady(true);
    }
    socket.onclose = () => {
      setIsReady(false);
    }
    socket.onmessage = (event) => {
      setValue(event.data);
    }

    ws.current = socket;

    return () => {
      socket.close();
    }
  }, []);

  const safeSend = (data: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(data)
    } else {
      console.warn("WebSocket не готов для отправки")
    }
  }

  return (
    <WebsocketContext.Provider value={[isReady, value, safeSend]}>
      {children}
    </WebsocketContext.Provider>
  )
}