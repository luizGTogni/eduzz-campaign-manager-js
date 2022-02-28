import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import styled, { breakpoints, IStyledProp } from '@eduzz/houston-ui/styles/styled';

import Campaigns from './Campaigns';
import { ScrollTopContext } from './scrollTopContext';

interface IAuthPageProps extends IStyledProp {
  page: string;
}

const AuthPage: React.FC<IAuthPageProps> = ({ page, className }) => {
  const [Page, setPage] = useState(<Campaigns />);
  const mainContent = useRef<HTMLDivElement>();

  const scrollTop = useCallback(() => setTimeout(() => mainContent.current.scrollTo(0, 0), 100), []);
  const navigate = useNavigate();

  useEffect(() => {
    if (page === '') setPage(<Campaigns />);
    else navigate('/');
  }, [page, navigate]);

  return (
    <div className={className}>
      <ScrollTopContext.Provider value={scrollTop}>
        <main ref={mainContent} className='main-content'>
          {Page}
        </main>
      </ScrollTopContext.Provider>
    </div>
  );
};

export default styled(AuthPage)`
  width: 100vw;
  height: 100vh;

  display: flex;

  position: relative;

  & .main-content {
    width: 100vw;
    height: 100vh;
    padding: ${({ theme }) => theme.variables.contentPadding}px;

    background-color: #ffffff;

    overflow: auto;

    ${breakpoints.up('sm')} {
      padding: ${({ theme }) => theme.variables.contentPaddingUpSm}px;
    }
  }
`;
