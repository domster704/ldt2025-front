import {createEntityAdapter} from "@reduxjs/toolkit";
import {SessionUploaded} from "@entities/session-upload/model/types";

export const sessionUploadedAdapter = createEntityAdapter<SessionUploaded, string>({
  selectId: session => session.id,
});