import React, {FC, useEffect, useRef, useState} from "react";
import {WebsocketContext} from "@app/providers/websocket-provider/lib/context";

interface WebsocketProviderProps {
  wsUrl: string;
  children: React.ReactNode;
  enabled?: boolean;
  onMessage?: (data: any) => void;
}

export const WebsocketProvider: FC<WebsocketProviderProps> = ({
                                                                children,
                                                                enabled = true,
                                                                wsUrl,
                                                                onMessage,
                                                              }) => {
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState<any | null>(null);

  const ws = useRef<WebSocket | null>(null);
  const onMessageRef = useRef<typeof onMessage | null>(null);
  onMessageRef.current = onMessage;

  useEffect(() => {
    if (!enabled) {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
      setIsReady(false);
      return;
    }

    const socket = new WebSocket(wsUrl);

    socket.onopen = () => setIsReady(true);
    socket.onclose = (event) => {
      console.warn("WebSocket закрыт:", event.code, event.reason);
      setIsReady(false);
    };
    socket.onerror = (e) => console.error("WS error:", e);

    socket.onmessage = (event) => {
      let parsed: any = event.data;
      try {
        parsed = JSON.parse(event.data);
      } catch {
      }

      setMessage(parsed);

      if (onMessageRef.current) {
        onMessageRef.current(parsed);
      }
    };

    ws.current = socket;
    return () => {
      socket.close();
      ws.current = null;
    };
  }, [wsUrl, enabled]);

  const safeSend = (data: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket не готов для отправки");
    }
  };

  return (
    <WebsocketContext.Provider value={{isReady, message: message, send: safeSend}}>
      {children}
    </WebsocketContext.Provider>
  );
};
