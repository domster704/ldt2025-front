import {createAsyncThunk} from "@reduxjs/toolkit";
import {SessionUploaded} from "@entities/session-upload";
import {ThunkApi} from "@shared/types/types";
import {$apiUrl} from "@shared/const/constants";

export const fetchMonitoringSession = createAsyncThunk<SessionUploaded, File, ThunkApi>(
  'sessionUpload/fetchMonitoringSession',
  async (file) => {
    const formData = new FormData();
    formData.append("archive", file);

    try {
      const response = await fetch(`${$apiUrl}/extract-bpm-uc-signals`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching monitoring session:', error);
      throw error;
    }
  }
)