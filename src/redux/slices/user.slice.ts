import type { UserSignupPayload } from "@/types/user.signup.payload.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const userInitialState: UserSignupPayload & {
  isEmailVerified: boolean;
} = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  gender: "male",
  isEmailVerified: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserSignupPayload>>) => {
      Object.assign(state, Object.assign(action.payload));
    },

    removeUser: (state) => {
      Object.assign(state, userInitialState);
    },
  },
});

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
