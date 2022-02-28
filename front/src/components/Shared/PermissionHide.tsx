import { memo, ReactNode } from 'react';

import { useSelector } from 'react-redux';

import { enRoles } from '@/interfaces/models/user';
import { RootState } from '@/store';
import { selectorCanAccess } from '@/store/selectors';

interface IPermissionHideProps {
  roles?: enRoles[];
  inverse?: boolean;
  children?: ReactNode;
}

const PermissionHide = memo<IPermissionHideProps>(({ roles, inverse, children }) => {
  const canAccess = useSelector((state: RootState) => selectorCanAccess(state, roles));

  const shouldRender = inverse ? !canAccess : canAccess;

  return <>{shouldRender && children}</>;
});

export default PermissionHide;
