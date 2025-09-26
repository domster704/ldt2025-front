import {SessionUploaded} from "@entities/session-upload";

export type Event = {
  time: number;
  type: "bpm" | "uc";
  value: number;
  index: number;
};

export function buildSessionEvents(session: SessionUploaded): Event[] {
  return [
    ...session.bpm.map((p, i) => ({
      time: p.time_sec,
      type: "bpm" as const,
      value: p.value!,
      index: i,
    })),
    ...session.uc.map((p, i) => ({
      time: p.time_sec,
      type: "uc" as const,
      value: p.value!,
      index: i,
    })),
  ];
}