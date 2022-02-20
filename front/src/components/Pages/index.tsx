import { memo, useCallback } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PermissionRoute from '../Shared/PermissionRoute';
import PublicPage from './Public';

const Pages = memo(() => {
  const renderRedirect = useCallback(() => <Navigate to='/' />, []);

  return (
    <Router>
      <Routes>
        <Route path='/login/*' element={<PublicPage page='login' />} />
        <Route path='/new-password/*' element={<PublicPage page='new-password' />} />
        <Route path='/' element={<PermissionRoute role={null} />} />

        <Route element={renderRedirect} />
      </Routes>
    </Router>
  );
});

export default Pages;
