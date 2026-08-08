import type { UserSignupPayload } from "@/types/user.signup.payload.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const userInitialState: UserSignupPayload = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  gender: "male",
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserSignupPayload>) => {
      Object.assign(state, action.payload);
    },

    removeUser: (state) => {
      Object.assign(state, userInitialState);
    },
  },
});

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
