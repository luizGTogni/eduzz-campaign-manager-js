import React, { memo, MouseEvent } from 'react';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import PasswordField from '@eduzz/houston-ui/Forms/Password';
import TextField from '@eduzz/houston-ui/Forms/Text';
import { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import IUser from '@/interfaces/models/user';
import authService from '@/services/auth';

interface ICreateFormProps extends IStyledProp {
  onLogin: (e: MouseEvent<HTMLElement>) => void;
}

const CreateForm: React.FC<ICreateFormProps> = props => {
  const form = useForm<IUser>({
    validationSchema: yup =>
      yup.object().shape({
        name: yup.string().required().min(3).max(250),
        email: yup.string().required().email().max(250),
        password: yup.string().required().min(6).max(25),
        repassword: yup.string().oneOf([yup.ref('password'), null], 'Senhas devem ser iguais!')
      }),
    async onSubmit(model) {
      await authService.create(model);
    }
  });

  return (
    <>
      <Form context={form} className={props.className}>
        <div>
          <Typography size='large' fontWeight='semibold' className='title'>
            Crie uma conta
          </Typography>
          <Typography className='subtitle'>Comece a gerenciar suas campanhas agora mesmo.</Typography>
        </div>

        <div>
          <TextField name='name' label='Nome Completo' />
          <TextField name='email' label='E-mail' type='email' />
          <PasswordField name='password' label='Senha' />
          <PasswordField name='repassword' label='Confirme sua senha' />
        </div>

        <div>
          <Button disabled={form.isSubmitting} type='submit' fullWidth>
            Cadastrar
          </Button>

          <hr />

          <Button disabled={form.isSubmitting} type='submit' fullWidth>
            Cadastrar com o Google
          </Button>

          <Typography className='link' onClick={props.onLogin}>
            Você já tem uma conta?
          </Typography>
        </div>
      </Form>
    </>
  );
};

export default memo(CreateForm);
