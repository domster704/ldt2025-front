import {createAsyncThunk} from "@reduxjs/toolkit";
import {$apiUrl} from "@shared/const/constants";

export const startEmulation = createAsyncThunk<void, File>(
  'upload/startEmulation',
  async (file) => {
    const formData = new FormData();
    formData.append('archive', file);
    const res = await fetch(`${$apiUrl}/http/crud/extract-signals`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      throw new Error('Не удалось запустить эмуляцию');
    }
  }
);