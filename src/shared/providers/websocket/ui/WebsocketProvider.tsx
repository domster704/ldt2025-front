import React, {FC, useEffect, useRef, useState} from "react";
import {WebsocketContext} from "@shared/providers/websocket/lib/context";
import {$wsApiUrl} from "@shared/const/constants";

interface WebsocketProviderProps {
  wsUrl: string;
  children: React.ReactNode;
}

export const WebsocketProvider: FC<WebsocketProviderProps> = ({children, wsUrl}) => {
  const [isReady, setIsReady] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      setIsReady(true);
    }
    socket.onclose = (event) => {
      console.warn("WebSocket закрыт:", event.code, event.reason);
      setIsReady(false);
    }

    socket.onerror = (e) => {
      console.log("error", e)
    }
    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setMessages((prev) => [...prev, msg]);
      } catch {
        setMessages((prev) => [...prev, event.data]);
      }
    };

    ws.current = socket;

    return () => {
      socket.close();
    }
  }, []);

  const safeSend = (data: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
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