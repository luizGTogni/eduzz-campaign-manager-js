import { memo } from 'react';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import CoreToolbar from '@mui/material/Toolbar';

import ExitIcon from '@eduzz/houston-icons/Exit';
import Button from '@eduzz/houston-ui/Button';
import { IStyledProp } from '@eduzz/houston-ui/styles/styled';

import { Container } from './styles';

import logo from '@/assets/images/logo.svg';
import authService from '@/services/auth';

const Toolbar: React.FC<IStyledProp> = ({ children, className }) => {
  const handleLogout = async () => {
    await authService.logout();
  };

  return (
    <Container className={className}>
      <AppBar className='app-bar' color='default' elevation={1}>
        <CoreToolbar>
          {children}
          {!children && (
            <Grid container alignItems='center'>
              <Grid item xs={true} className='left'>
                <img src={logo} alt='logo' className='logo' />
              </Grid>
              <Grid item xs={false}>
                <Button onClick={handleLogout} endIcon={<ExitIcon />}>
                  Sair
                </Button>
              </Grid>
            </Grid>
          )}
        </CoreToolbar>
      </AppBar>
    </Container>
  );
};

export default memo(Toolbar);
