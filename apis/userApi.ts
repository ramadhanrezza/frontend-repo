import axios from 'axios';
import { User } from '../entities/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export const userApi = {
  async updateUserData(user: Partial<User>, token: string) {
    try {
      const response = await apiClient.put<User>(`${API_BASE_URL}/update-user-data`, user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Update User Error', error);
      throw error;
    }
  },

  async fetchUserData(token: string) {
    try {
      const response = await apiClient.get<User>(`${API_BASE_URL}/fetch-user-data`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Fetch User Error', error);
      throw error;
    }
  }
};