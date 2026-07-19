import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  gender?: string;
  photoURL?: string;
  about?: string;
  skills?: string[];
}

// Shape of the user object returned by the API (note: `_id`, not `id`).
interface ApiUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  gender?: string;
  photoURL?: string;
  about?: string;
  skills?: string[];
}

const initialState: UserState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ApiUser>) => {
      const user = action.payload;
      state.id = user._id;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.email = user.email;
      // Optional fields: assign directly (undefined is allowed by `?`).
      state.age = user.age;
      state.gender = user.gender;
      state.photoURL = user.photoURL;
      state.about = user.about;
      state.skills = user.skills;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
