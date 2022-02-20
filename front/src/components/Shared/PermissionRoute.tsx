import { memo } from 'react';

import { Navigate, RouteProps } from 'react-router-dom';

import { enRoles } from '@/interfaces/models/user';

interface IProps extends RouteProps {
  role?: enRoles;
}

const PermissionRoute = memo<IProps>(({ role }) => {
  const isAuthenticated = false;

  if (isAuthenticated === undefined) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return <></>;
});

export default PermissionRoute;
