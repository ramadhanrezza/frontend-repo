import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { User } from "@/entities/user";
import { Login } from "@/entities/login";
import { firebase } from "@/apis/firebase";
import { FirebaseError } from "firebase/app";
import { userApi } from "@/apis/userApi";


interface ThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}

export const loginUser = createAsyncThunk<
  User,
  Login,
  ThunkConfig
>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { token, user } = await firebase.login(email, password);
      localStorage.setItem('token', token);
      return {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        phone: user.phoneNumber
      } as User;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
    }
    return rejectWithValue('Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk<
  null, 
  void, 
  ThunkConfig
>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await firebase.logout();
      localStorage.removeItem('token');
      return null;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
    }
  }
);

export const fetchUserData = createAsyncThunk<
  User, 
  void, 
  ThunkConfig
>(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token');
      }
      
      const userData = await userApi.fetchUserData(token);
      return userData;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Fetch failed');
    }
  }
);

export const updateUserData = createAsyncThunk<
  User, 
  Partial<User>, 
  ThunkConfig
>(
  'user/updateUserData',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token');
      }
      
      const updatedUser = await userApi.updateUserData(userData, token);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Update failed');
    }
  }
);