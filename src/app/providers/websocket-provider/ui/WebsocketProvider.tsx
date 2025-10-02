import React, {FC, useEffect, useRef, useState} from "react";
import {WebsocketContext} from "@app/providers/websocket-provider/lib/context";

/**
 * Свойства компонента {@link WebsocketProvider}.
 */
interface WebsocketProviderProps {
  /**
   * URL для подключения к WebSocket-серверу.
   * Пример: `ws://localhost:8080/ws`
   */
  wsUrl: string;

  /**
   * Дочерние элементы, которым будет доступен контекст WebSocket.
   */
  children: React.ReactNode;

  /**
   * Включение/выключение подключения.
   * - `true` (по умолчанию) — подключение активно.
   * - `false` — соединение закрывается, контекст сбрасывается.
   */
  enabled?: boolean;

  /**
   * Коллбэк, вызываемый при получении новых сообщений по WebSocket.
   * Получает данные в формате `any` (строка или распарсенный JSON).
   */
  onMessage?: (data: any) => void;
}

/**
 * Провайдер контекста для управления WebSocket-подключением.
 *
 * ### Функциональность:
 * - Создаёт и поддерживает WebSocket-соединение с заданным `wsUrl`.
 * - Управляет состоянием подключения (`isReady`).
 * - Передаёт последнее полученное сообщение (`message`) в контекст.
 * - Предоставляет метод `send` для безопасной отправки сообщений.
 *
 * ### Обработка событий:
 * - `onopen` → переводит соединение в состояние готовности (`isReady = true`).
 * - `onclose` → закрывает соединение, сбрасывает состояние.
 * - `onerror` → выводит ошибку в консоль.
 * - `onmessage` → парсит данные (пытается `JSON.parse`) и передаёт в контекст + `onMessage`-коллбэк.
 *
 * ### Применение:
 * Оборачивает дочерние компоненты и предоставляет им доступ к состоянию WebSocket через {@link WebsocketContext}.
 *
 * @component
 * @example
 * ```tsx
 * import {useContext, useEffect} from "react";
 * import {WebsocketContext} from "@app/providers/websocket-provider/lib/context";
 *
 * const Chat = () => {
 *   const ws = useContext(WebsocketContext);
 *
 *   useEffect(() => {
 *     if (ws?.message) {
 *       console.log("Новое сообщение:", ws.message);
 *     }
 *   }, [ws?.message]);
 *
 *   return (
 *     <div>
 *       <button onClick={() => ws?.send({type: "ping"})}>
 *         Отправить ping
 *       </button>
 *       {ws?.isReady ? "Соединение активно" : "Нет соединения"}
 *     </div>
 *   );
 * };
 *
 * export const App = () => (
 *   <WebsocketProvider wsUrl="ws://localhost:8080/ws">
 *     <Chat />
 *   </WebsocketProvider>
 * );
 * ```
 */
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
        // если не JSON, остаётся строкой
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

  /**
   * Безопасная отправка сообщений через WebSocket.
   * Перед отправкой выполняется проверка, что соединение открыто.
   *
   * @param data Данные для отправки (строка или объект).
   */
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
