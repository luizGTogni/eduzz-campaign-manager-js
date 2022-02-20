import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import LoginPage from './Login';
import NewPasswordPage from './NewPassword';

import logo from '@/assets/images/logo.svg';

const PublicPage: React.FC<IStyledProp> = ({ className }) => {
  return (
    <div className={className}>
      <div className='splash' />

      <div className='container'>
        <img src={logo} alt='logo' />

        <div className='content'>
          <>
            <Routes>
              <Route path='/login' element={LoginPage} />
              <Route path='/recovery-password' element={NewPasswordPage} />
            </Routes>
          </>
        </div>

        <div className='footer'>
          <Typography size='x-small'>Eduzz Campaign Manager@{new Date().getFullYear()}</Typography>
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
