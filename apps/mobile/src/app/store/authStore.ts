import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import EncryptedStorage from 'react-native-encrypted-storage';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create(
  immer<AuthState>((set) => ({
    isLoggedIn: false,
    token: null,
    loading: true,
    login: async (token) => {
      try {
        await EncryptedStorage.setItem('auth_token', token);
        set((state) => {
          state.token = token;
          state.isLoggedIn = true;
        });
      } catch (error) {
        console.log('Error login', error);
      }
    },
    logout: async () => {
      try {
        await EncryptedStorage.removeItem('auth_token');
        set((state) => {
          state.token = null;
          state.isLoggedIn = false;
        });
      } catch (error) {
        console.log('Error logout', error);
      }
    },
    loadToken: async () => {
      try {
        const storedToken = await EncryptedStorage.getItem('auth_token');
        set((state) => {
          if (storedToken) {
            state.token = storedToken;
            state.isLoggedIn = true;
          }
        });
      } catch (error) {
        console.log('error load token', error);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
  }))
);
