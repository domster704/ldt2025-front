import {MonitoringSession} from "@entities/session-upload";

export async function streamSession(session: MonitoringSession, safeSend: (data: any) => void) {
  for (let i = 0; i < session.heartRate.length; i++) {
    const fhrPoint = session.heartRate[i];
    const ucPoint = session.uterineContractions[i];

    safeSend({
      type: "DATA_POINT",
      payload: {
        time: fhrPoint.time,
        fhr: fhrPoint.value,
        uc: ucPoint?.value,
      }
    });

    await new Promise(res => setTimeout(res, fhrPoint.time));
  }
}
