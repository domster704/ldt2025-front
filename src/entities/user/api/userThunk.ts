import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, UserMainData} from "@entities/user/model/User";
import {ThunkApi} from "@shared/types";
import {$api} from "@shared/api/axiosConfig";

/**
 * @description получение данных пользователя по user_id из Telegram
 */
export const fetchUserByPhoneTelegramUserID = createAsyncThunk<[User, number], void, ThunkApi>(
  'users/fetchUserByPhoneTelegramUserID',
  async () => {
    try {
      const response = await $api.get('/tg-user/me');
      return [response.data as User, response.status];
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
  }
);

/**
 * @description установка данных пользователя
 */
export const fetchUserSetUserData = createAsyncThunk<UserMainData | null, Partial<User>, ThunkApi>(
  'users/fetchUserSetUserData',
  async (user: Partial<User>) => {
    if (!user.user_id) return null;

    const response = await $api.put('/tg-user/user-info', user);
    return response.data;
  }
);
