import { memo, useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import { IStyledProp } from '@eduzz/houston-ui/styles/styled';

import CreateForm from './view/Create';
import LoginForm from './view/Form';
import LoginRecoveryAccess from './view/RecoveryAccess';

import { selectorIsAuthenticated } from '@/store/selectors';

const LoginPage = memo<IStyledProp>(({ className }) => {
  const [currentView, setCurrentView] = useState(0);

  const isAuthenticated = useSelector(selectorIsAuthenticated);

  const onLogin = useCallback(() => setCurrentView(0), []);
  const onCreate = useCallback(() => setCurrentView(1), []);
  const onRecoveryAccess = useCallback(() => setCurrentView(2), []);

  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <div className={className}>
      <SwipeableViews index={currentView} height='100%'>
        <div className='step'>
          <LoginForm onRecoveryAccess={onRecoveryAccess} onCreate={onCreate} />
        </div>
        <div className='step'>
          <CreateForm onLogin={onLogin} />
        </div>
        <div className='step'>
          <LoginRecoveryAccess onLogin={onLogin} onComplete={onLogin} />
        </div>
      </SwipeableViews>
    </div>
  );
});

export default LoginPage;
