import apiService from './api';
import cacheService from './cache';

import IUser from '@/interfaces/models/user';
import { store } from '@/store';
import { authTokenSlice } from '@/store/slices/authToken';

export class AuthService {
  public async create(user: IUser): Promise<void> {
    await apiService.post('/auth/create', user);
  }

  public async login(email: string, password: string): Promise<void> {
    const { token } = await apiService.post('/auth/login', { email, password });
    store.dispatch(authTokenSlice.actions.set(token));
  }

  public async logout(): Promise<void> {
    store.dispatch(authTokenSlice.actions.clear());
    await cacheService.clear();
  }
}

const authService = new AuthService();
export default authService;
