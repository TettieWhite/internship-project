import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    _id: '',
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    preferences: {
      cityId: '',
    },
  },
  loadingStatus: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoadingStatus: (state, { payload }) => {
      state.loadingStatus = payload.status;
    },
    setUser: (state, { payload }) => {
      state.user.id = payload.id;
      state.user.email = payload.email;
      state.user.role = payload.role;
      state.user.firstName = payload.firstName;
      state.user.lastName = payload.lastName;
      state.user.preferences.cityId = payload.preferences.cityId;
    },
    resetUser: (state) => {
      state.user = initialState;
    },
  },
});

export const { setUserLoadingStatus, setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
