import {createContext} from "react";

export type sendSignature = (data: string) => void

type WebsocketContextType = [
  boolean,
    string | null,
  sendSignature?
]

export const WebsocketContext = createContext<WebsocketContextType>([
  false,
  null,
  undefined
])