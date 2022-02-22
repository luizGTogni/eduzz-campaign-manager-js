import React, { memo, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import useForm from '@eduzz/houston-forms/useForm';
import ChevronLeft from '@eduzz/houston-icons/ChevronLeft';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import PasswordField from '@eduzz/houston-ui/Forms/Password';
import { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

interface IModel {
  password: string;
  repassword: string;
}

const NewPasswordPage: React.FC<IStyledProp> = ({ className }) => {
  const navigate = useNavigate();

  const form = useForm<IModel>({
    initialValues: { password: '', repassword: '' },
    validationSchema: yup =>
      yup.object().shape({
        password: yup.string().required().min(6).max(25),
        repassword: yup.string().oneOf([yup.ref('password'), null], 'Senhas devem ser iguais!')
      }),
    async onSubmit() {
      // await authService.resetPassword(model.email);
      navigate('/');
    }
  });

  const handleBack = useCallback(() => navigate('/'), [navigate]);

  return (
    <div className={className}>
      <Form context={form}>
        <div>
          <Typography size='large' fontWeight='semibold' className='title'>
            Mude sua senha
          </Typography>
          <Typography className='subtitle'>Luiz, estamos quase terminando!</Typography>
          <Typography className='subtitle'>Falta só um pouco.</Typography>
        </div>

        <div>
          <PasswordField name='password' label='Nova senha' disabled={form.isSubmitting} />
          <PasswordField name='repassword' label='Confirme a nova senha' disabled={form.isSubmitting} />

          <Button disabled={form.isSubmitting} loading={form.isSubmitting} type='submit' fullWidth>
            Enviar
          </Button>
        </div>

        <Typography className='link' onClick={handleBack}>
          <ChevronLeft />
          Voltar para tela inicial
        </Typography>
      </Form>
    </div>
  );
};

export default memo(NewPasswordPage);
