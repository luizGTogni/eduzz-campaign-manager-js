import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { IStyledProp } from '@eduzz/houston-ui/styles/styled';

import Campaigns from './Campaigns';

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

  return (
    <div className={className}>
      <main ref={mainContent} className='main-content'>
        {Page}
      </main>
    </div>
  );
};

export default AuthPage;
