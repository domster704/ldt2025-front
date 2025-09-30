import {createContext} from "react";

export type sendSignature = (data: string) => void;

export interface IWebsocketContext {
  isReady: boolean;
  message: any;
  send: (data: any) => void;
}

export const WebsocketContext = createContext<IWebsocketContext>({
  isReady: false,
  message: null,
  send: () => console.warn("WebSocket не готов"),
})