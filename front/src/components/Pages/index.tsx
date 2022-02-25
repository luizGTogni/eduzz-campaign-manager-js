import { memo, useCallback } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PermissionRoute from '../Shared/PermissionRoute';
import AuthPage from './Auth';
import PublicPage from './Public';

const Pages = memo(() => {
  const renderRedirect = useCallback(() => <Navigate to='/' />, []);

  console.log('aqui');

  return (
    <Router>
      <Routes>
        <Route path='/login/*' element={<PublicPage page='login' />} />
        <Route path='/new-password/*' element={<PublicPage page='new-password' />} />
        <Route path='/*' element={<PermissionRoute role={null} path='/' element={<AuthPage page='' />} />} />

        <Route element={renderRedirect} />
      </Routes>
    </Router>
  );
});

export default Pages;
