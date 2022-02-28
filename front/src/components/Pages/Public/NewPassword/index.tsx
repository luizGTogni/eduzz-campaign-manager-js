import React, { memo, useCallback, useEffect, useState } from 'react';

import queryString from 'query-string';
import { FiChevronLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import PasswordField from '@eduzz/houston-ui/Forms/Password';
import { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import IResetPasswordToken from '@/interfaces/tokens/resetPasswordToken';
import authService from '@/services/auth';
import { selectorIsAuthenticated } from '@/store/selectors';
import decodeJWTToken from '@/utils/helpers/jwt';

interface IModel {
  password: string;
  repassword: string;
}

const NewPasswordPage: React.FC<IStyledProp> = ({ className }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [tokenData, setTokenData] = useState<IResetPasswordToken>();

  const isAuthenticated = useSelector(selectorIsAuthenticated);

  const form = useForm<IModel>({
    initialValues: { password: '', repassword: '' },
    validationSchema: yup =>
      yup.object().shape({
        password: yup.string().required().min(6).max(25),
        repassword: yup.string().oneOf([yup.ref('password'), null], 'Senhas devem ser iguais!')
      }),
    async onSubmit(model) {
      await authService.resetPassword(token, model.password);
      navigate('/');
    }
  });

  useEffect(() => {
    const token = queryString.parse(location.search).t as string;
    const tokenData = decodeJWTToken<IResetPasswordToken>(token);

    setToken(token);
    setTokenData(tokenData);
    setLoading(false);
  }, []);

  const handleBack = useCallback(() => navigate('/'), [navigate]);

  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <div className={className}>
      {!loading && !tokenData && (
        <div>
          <Typography className='invalid-token' onClick={handleBack}>
            Token Inválido
          </Typography>

          <Button type='button' startIcon={<FiChevronLeft />} onClick={handleBack} fullWidth>
            Voltar para tela inicial
          </Button>
        </div>
      )}

      {!loading && !!tokenData && (
        <Form context={form}>
          <div>
            <Typography size='large' fontWeight='semibold' className='title'>
              Mude sua senha
            </Typography>
            <Typography className='subtitle'>{tokenData?.name}, estamos quase terminando!</Typography>
            <Typography className='subtitle'>Falta só um pouco.</Typography>
          </div>

          <div>
            <PasswordField name='password' label='Nova senha' disabled={form.isSubmitting} />
            <PasswordField name='repassword' label='Confirme a nova senha' disabled={form.isSubmitting} />

            <Button disabled={loading || form.isSubmitting} loading={form.isSubmitting} type='submit' fullWidth>
              Enviar
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default memo(NewPasswordPage);
