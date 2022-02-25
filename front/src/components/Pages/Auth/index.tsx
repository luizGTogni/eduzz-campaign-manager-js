import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@eduzz/houston-ui/Button';
import { IStyledProp } from '@eduzz/houston-ui/styles/styled';

import Campaigns from './Campaigns';

import authService from '@/services/auth';

interface IAuthPageProps extends IStyledProp {
  page: string;
}

const AuthPage: React.FC<IAuthPageProps> = ({ page, className }) => {
  const [Page, setPage] = useState(<Campaigns />);
  const mainContent = useRef<HTMLDivElement>();
  const navigate = useNavigate();

  useEffect(() => {
    if (page === '') setPage(<Campaigns />);
    else navigate('/');
  }, [page, navigate]);

  const handleLogout = async () => {
    await authService.logout();
  };

  return (
    <div className={className}>
      <Button onClick={handleLogout}>Sair</Button>
      <main ref={mainContent} className='main-content'>
        {Page}
      </main>
    </div>
  );
};

export default AuthPage;
