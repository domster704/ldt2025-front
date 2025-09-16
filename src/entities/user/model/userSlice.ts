import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User, UserMainData, UserPromoLinkInfo} from "@entities/user/model/User";
import {fetchUserByPhoneTelegramUserID, fetchUserSetUserData} from "@entities/user/api/userThunk";

let initialState: {
  user: User,
  userPromoLiked: UserPromoLinkInfo[],
  userPromoActivated: UserPromoLinkInfo[],
} = {
  user: {} as User,
  userPromoLiked: [],
  userPromoActivated: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
  }
});

export const {
  setUserId,
  setOnboardingSeen
} = userSlice.actions;
export default userSlice.reducer