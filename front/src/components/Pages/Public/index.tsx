import { memo, useEffect, useState } from 'react';

import { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import LoginPage from './Login';
import NewPasswordPage from './NewPassword';

import logo from '@/assets/images/logo.svg';

interface IPublicPageProps extends IStyledProp {
  page: string;
}
const PublicPage = memo<IPublicPageProps>(({ page, className }) => {
  const [Page, setPage] = useState(<LoginPage />);

  useEffect(() => {
    if (page === 'login') setPage(<LoginPage />);
    else if (page === 'new-password') setPage(<NewPasswordPage />);
  }, [page]);

  return (
    <div className={className}>
      <div className='splash' />

      <div className='container'>
        <img src={logo} alt='logo' />

        <div className='content'>{Page}</div>

        <div className='footer'>
          <Typography size='x-small'>Eduzz Campaign Manager@{new Date().getFullYear()}</Typography>
        </div>
      </div>
    </div>
  );
});

export default PublicPage;
