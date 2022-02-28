import { memo, useEffect, useState } from 'react';

import { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import LoginPage from './Login';
import NewPasswordPage from './NewPassword';
import { Container, Wrapper } from './styles';

import Splash from '@/components/Layout/Splash';

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
    <Container className={className}>
      <Splash />

      <Wrapper>
        <div className='content'>{Page}</div>

        <div className='footer'>
          <Typography size='x-small'>Eduzz Campaign Manager - {new Date().getFullYear()}</Typography>
        </div>
      </Wrapper>
    </Container>
  );
});

export default PublicPage;
