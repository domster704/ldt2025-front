import {createContext} from "react";

type WebsocketContextType = [
  boolean,
    string | null,
  ((data: string) => void)?
]

export const WebsocketContext = createContext<WebsocketContextType>([
  false,
  null,
  undefined
])