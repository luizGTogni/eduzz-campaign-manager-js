import { memo } from 'react';

import { Navigate, RouteProps } from 'react-router-dom';

import { enRoles } from '@/interfaces/models/user';

interface IProps extends RouteProps {
  role?: enRoles;
}

const PermissionRoute = memo<IProps>(({ role }) => {
  const isAuthenticated = false;

  console.log('aqui 1');

  if (isAuthenticated === undefined) {
    return null;
  }

  if (!isAuthenticated) {
    console.log('aqui 2');
    return <Navigate to='/login' />;
  }

  return <></>;
});

export default PermissionRoute;
