import React, { MouseEvent } from 'react';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import PasswordField from '@eduzz/houston-ui/Forms/Password';
import TextField from '@eduzz/houston-ui/Forms/Text';
import { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import authService from '@/services/auth';

interface ILoginFormProps extends IStyledProp {
  onCreate: (e: MouseEvent<HTMLElement>) => void;
  onRecoveryAccess: (e: MouseEvent<HTMLElement>) => void;
}

interface IModel {
  email: string;
  password: string;
}

const LoginForm: React.FC<ILoginFormProps> = props => {
  const form = useForm<IModel>({
    initialValues: { email: '', password: '' },
    validationSchema: yup =>
      yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required()
      }),
    async onSubmit(model: IModel) {
      await authService.login(model.email, model.password);
    }
  });

  return (
    <>
      <Form context={form} className={props.className}>
        <div>
          <Typography size='large' fontWeight='semibold' className='title'>
            Bem vindo de volta.
          </Typography>
          <Typography className='subtitle'>Vamos fazer seu login</Typography>
        </div>

        <div>
          <TextField name='email' label='E-mail' type='email' />
          <PasswordField name='password' label='Senha' />
          <Typography className='resetButton' onClick={props.onRecoveryAccess}>
            Esqueceu sua senha?
          </Typography>
        </div>

        <div>
          <Button disabled={form.isSubmitting} type='submit' fullWidth>
            Entrar
          </Button>

          <hr />

          <Button disabled={form.isSubmitting} type='submit' fullWidth>
            Entrar com o Google
          </Button>

          <Typography className='link' onClick={props.onCreate}>
            Ainda não tem uma conta?
          </Typography>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
