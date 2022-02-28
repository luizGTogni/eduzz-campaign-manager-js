import { createSelector } from 'reselect';

import { enRoles } from '@/interfaces/models/user';
import IUserToken from '@/interfaces/tokens/userToken';
import { RootState } from '@/store';
import decodeJWTToken from '@/utils/helpers/jwt';

export const selectorIsAuthenticated = createSelector(
  (state: RootState) => state.authToken.value,
  token => !!token
);

export const selectorUser = createSelector(
  (state: RootState) => state.authToken.value,
  token => (token ? decodeJWTToken<IUserToken>(token) : null)
);

export const selectorCanAccess = createSelector(
  selectorUser,
  (state: RootState, roles: enRoles[]) => roles,
  (user, roles) => {
    if (!user) return false;

    if (!roles || roles.length === 0) return true;
    if (user.roles.includes('sysAdmin') || user.roles.includes('admin')) return true;

    return roles.some(role => user.roles.includes(role));
  }
);
