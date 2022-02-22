import { memo, useCallback, useState } from 'react';

import SwipeableViews from 'react-swipeable-views';

import { IStyledProp } from '@eduzz/houston-ui/styles/styled';

import CreateForm from './view/Create';
import LoginForm from './view/Form';
import LoginRecoveryAccess from './view/RecoveryAccess';

const LoginPage = memo<IStyledProp>(({ className }) => {
  const [currentView, setCurrentView] = useState(0);

  const onLogin = useCallback(() => setCurrentView(0), []);
  const onCreate = useCallback(() => setCurrentView(1), []);
  const onRecoveryAccess = useCallback(() => setCurrentView(2), []);

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
