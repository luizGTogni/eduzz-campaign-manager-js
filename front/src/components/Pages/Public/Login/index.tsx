import { memo, useState } from 'react';

import SwipeableViews from 'react-swipeable-views';

import { IStyledProp } from '@eduzz/houston-ui/styles/styled';

const LoginPage = memo<IStyledProp>(({ className }) => {
  const [currentView, _setCurrentView] = useState(0);

  return (
    <div className={className}>
      <SwipeableViews index={currentView} height='100%'>
        <div className='step'>
          <div>Login Form</div>
        </div>
        <div className='step'>
          <div>Create Form</div>
        </div>
        <div className='step'>
          <div>Recovery Access</div>
        </div>
      </SwipeableViews>
    </div>
  );
});

export default LoginPage;
