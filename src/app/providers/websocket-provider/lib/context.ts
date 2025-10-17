import {createContext} from "react";

/**
 * Сигнатура функции отправки данных через WebSocket.
 *
 * @param data Данные для отправки (строка или сериализуемый объект).
 */
export type sendSignature = (data: string) => void;

/**
 * Интерфейс описывает структуру значения,
 * передаваемого через {@link WebsocketContext}.
 */
export interface IWebsocketContext {
  /**
   * Флаг готовности соединения:
   * - `true` — WebSocket открыт и доступен для обмена данными.
   * - `false` — соединение закрыто или ещё не установлено.
   */
  isReady: boolean;

  /**
   * Последнее полученное сообщение от сервера.
   * Может быть строкой или результатом `JSON.parse`.
   */
  message: any;

  /**
   * Функция для отправки данных на сервер через WebSocket.
   * Должна сериализовать объект в JSON или отправить строку.
   */
  send: (data: unknown) => void;
}

/**
 * Контекст для доступа к состоянию WebSocket-соединения.
 *
 * Значение по умолчанию:
 * ```ts
 * {
 *   isReady: false,
 *   message: null,
 *   send: () => console.warn("WebSocket не готов"),
 * }
 * ```
 *
 * Для корректной работы необходимо обернуть дерево компонентов
 * в {@link WebsocketProvider}, который инициализирует соединение
 * и обновляет состояние.
 *
 * @see WebsocketProvider
 */
export const WebsocketContext = createContext<IWebsocketContext>({
  isReady: false,
  message: null,
  send: () => console.warn("WebSocket не готов"),
});
