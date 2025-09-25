import {SessionUploaded} from "@entities/session-upload";

export async function streamSession(session: SessionUploaded, safeSend: (data: any) => void) {
  for (let i = 0; i < session.bpm.length; i++) {
    const fhrPoint = session.bpm[i];
    const ucPoint = session.uc[i];

    safeSend({
      type: "DATA_POINT",
      payload: {
        time: fhrPoint.time_sec,
        fhr: fhrPoint.value,
        uc: ucPoint?.value,
      }
    });

    await new Promise(res => setTimeout(res, fhrPoint.time_sec));
  }
}
