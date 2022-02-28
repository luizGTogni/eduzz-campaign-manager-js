import { memo } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';

import PermissionHide from './PermissionHide';

import { enRoles } from '@/interfaces/models/user';
import { selectorIsAuthenticated } from '@/store/selectors';

interface IProps extends RouteProps {
  role?: enRoles[];
}

const PermissionRoute = memo<IProps>(({ role, ...props }) => {
  const isAuthenticated = useSelector(selectorIsAuthenticated);

  if (isAuthenticated === undefined) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <PermissionHide roles={role}>
        <Routes>
          <Route {...props} />
        </Routes>
      </PermissionHide>

      <PermissionHide inverse roles={role}>
        <p>Não Encontrado</p>
      </PermissionHide>
    </>
  );
});

export default PermissionRoute;
