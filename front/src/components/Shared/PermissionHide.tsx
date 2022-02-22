import { memo, ReactNode } from 'react';

import { enRoles } from '@/interfaces/models/user';

interface IPermissionHideProps {
  role?: enRoles | enRoles[];
  inverse?: boolean;
  children?: ReactNode;
}

const PermissionHide = memo<IPermissionHideProps>(({ inverse, children }) => {
  //const roles = useMemo(() => (Array.isArray(role) ? role : role ? [role] : []), [role]);
  const canAccess = true;

  const shouldRender = inverse ? !canAccess : canAccess;

  return <>{shouldRender && children}</>;
});

export default PermissionHide;
