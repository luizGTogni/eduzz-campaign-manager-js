import { memo } from 'react';

import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';

import PermissionHide from './PermissionHide';

import { enRoles } from '@/interfaces/models/user';

interface IProps extends RouteProps {
  role?: enRoles;
}

const PermissionRoute = memo<IProps>(({ role, ...props }) => {
  const isAuthenticated = true;

  if (isAuthenticated === undefined) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <PermissionHide role={role}>
        <Routes>
          <Route {...props} />
        </Routes>
      </PermissionHide>

      <PermissionHide inverse role={role}>
        <p>Não Encontrado</p>
      </PermissionHide>
    </>
  );
});

export default PermissionRoute;
