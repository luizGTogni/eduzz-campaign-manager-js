import React, { memo, MouseEvent } from 'react';

import useForm from '@eduzz/houston-forms/useForm';
import ChevronLeft from '@eduzz/houston-icons/ChevronLeft';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';
import { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Toast from '@eduzz/houston-ui/Toast';
import Typography from '@eduzz/houston-ui/Typography';

import { Container } from './styles';

import IUser from '@/interfaces/models/user';
import authService from '@/services/auth';

interface ILoginRecoveryAccessProps extends IStyledProp {
  onLogin: (e: MouseEvent<HTMLElement>) => void;
  onComplete: () => void;
}

const LoginRecoveryAccess: React.FC<ILoginRecoveryAccessProps> = props => {
  const form = useForm<IUser>({
    initialValues: { email: '' },
    validationSchema: yup => yup.object().shape({ email: yup.string().required().email() }),
    async onSubmit(model) {
      try {
        await authService.sendResetPassword(model.email);
        Toast.info(`Foi enviado um link para o e-mail ${model.email} para podermos recuperar seu acesso.`);
        props.onComplete();
        form.reset();
      } catch (err) {
        Toast.error('Não foi possível recuperar a senha.');
      }
    }
  });

  return (
    <Container>
      <Form context={form} className={props.className}>
        <div>
          <Typography size='large' fontWeight='semibold' className='title'>
            Mude sua senha
          </Typography>
          <Typography className='subtitle'>Não se preocupe isso será rápido!</Typography>
        </div>

        <div>
          <TextField name='email' label='E-mail' type='email' disabled={form.isSubmitting} />

          <Button disabled={form.isSubmitting} loading={form.isSubmitting} className='submit' type='submit' fullWidth>
            Enviar
          </Button>
        </div>

        <Typography className='link' onClick={props.onLogin}>
          <ChevronLeft />
          Voltar para tela inicial
        </Typography>
      </Form>
    </Container>
  );
};

export default memo(LoginRecoveryAccess);
