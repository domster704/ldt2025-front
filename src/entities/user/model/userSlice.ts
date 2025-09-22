import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User, UserMainData} from "@entities/user/model/User";
import {
  fetchSetUserPassOnboarding,
  fetchUserByPhoneTelegramUserID,
  fetchUserSetUserData
} from "@entities/user/api/userThunk";

let initialState: {
  user: User,
} = {
  user: {
    first_name: 'dev',
    last_name: 'dev',
    phone: '+79127458900',
    email: ''
  } as User,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Установка user_id из tg_user_id. Обычно берется из Telegram.unsafe_initData.
     */
    setUserId: (state, action: PayloadAction<string>) => {
      state.user.user_id = action.payload;
    },
    setOnboardingSeen: (state, action: PayloadAction<boolean>) => {
      console.log("setOnboardingSeen", action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserByPhoneTelegramUserID.fulfilled, (state, action: PayloadAction<[User, number]>) => {
        state.user = action.payload[0];
      })
      .addCase(fetchUserSetUserData.fulfilled, (state, action: PayloadAction<UserMainData | null>) => {
        if (action.payload === null) {
          return;
        }
        state.user = {
          ...state.user,
          ...action.payload
        };
      })
      .addCase(fetchSetUserPassOnboarding.fulfilled, (state, action: PayloadAction<any>) => {
        state.user.isPassedOnboarding = true;
      })
  }
});

export const {
  setUserId,
  setOnboardingSeen
} = userSlice.actions;
export default userSlice.reducer