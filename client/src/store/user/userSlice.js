import { createSlice } from '@reduxjs/toolkit';
import requestApi from '../../helpers/requestApi';

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
  isAuth: null,
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
      state.user = initialState.user;
    },
    setAuth: (state, { payload }) => {
      state.isAuth = payload.isAuth;
    },
    resetAuth: (state) => {
      state.isAuth = initialState.isAuth;
    },
  },
});

export const userActions = userSlice.actions;

export const fetchUserData = async (dispatch) => {
  const response = await requestApi('/user/me', 'POST');
  if (!response.error) {
    dispatch(
      userActions.setAuth({
        isAuth: true,
      })
    );
    dispatch(
      userActions.setUser({
        id: response.data._id,
        email: response.data.email,
        role: response.data.role,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        preferences: {
          cityId: response.data.preferences.cityId,
        },
      })
    );
  } else {
    dispatch(
      userActions.setAuth({
        isAuth: false,
      })
    );
  }
};

export default userSlice.reducer;
