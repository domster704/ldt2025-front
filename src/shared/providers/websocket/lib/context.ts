import {createContext} from "react";

export type sendSignature = (data: string) => void;

export interface WebsocketContextType {
  isReady: boolean;
  messages: any[];
  send: (data: any) => void;
}

export const WebsocketContext = createContext<WebsocketContextType>({
  isReady: false,
  messages: [],
  send: () => console.warn("WebSocket не готов"),
})