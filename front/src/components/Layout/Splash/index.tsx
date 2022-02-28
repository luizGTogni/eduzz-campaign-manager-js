import { memo } from 'react';

import { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import { Container } from './styles';

import logo from '@/assets/images/logo.svg';

const Splash = memo<IStyledProp>(({ className }) => {
  return (
    <Container className={className}>
      <div className='opacity'></div>
      <div className='content'>
        <img src={logo} alt='logo' className='logo' />
        <Typography className='title' fontWeight='bold' size='x-large'>
          Eduzz Campaign Manager
        </Typography>
        <Typography className='subtitle' size='large'>
          Gerencie suas campanhas de forma simples, rápida e fácil!
        </Typography>
      </div>
      <div className='image'></div>
    </Container>
  );
});

export default Splash;
