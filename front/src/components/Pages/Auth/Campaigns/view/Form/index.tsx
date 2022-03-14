import { memo, useCallback } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import CurrencyField from '@eduzz/houston-ui/Forms/Currency';
import DateField from '@eduzz/houston-ui/Forms/DatePicker';
import Form from '@eduzz/houston-ui/Forms/Form';
import SelectField, { ISelectFieldOption } from '@eduzz/houston-ui/Forms/Select';
import TextField from '@eduzz/houston-ui/Forms/Text';
import Grid from '@eduzz/houston-ui/Grid';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Toast from '@eduzz/houston-ui/Toast';

import { ICampaign } from '@/interfaces/models/campaign';
import campaignService from '@/services/campaign';

interface ICampaignFormProps extends IStyledProp {
  opened: boolean;
  data?: ICampaign;
  onComplete: (data: ICampaign) => void;
  onCancel: () => void;
}

const sources: ISelectFieldOption[] = [
  { label: 'Facebook', value: 1 },
  { label: 'Instagram', value: 2 },
  { label: 'Whatsapp', value: 3 },
  { label: 'Google', value: 4 },
  { label: 'TikTok', value: 5 },
  { label: 'Youtube', value: 6 },
  { label: 'Twitter', value: 7 },
  { label: 'Outros', value: 8 }
];
const CampaignForm: React.FC<ICampaignFormProps> = props => {
  const { opened, className, data, onComplete, onCancel } = props;

  const form = useForm<ICampaign>({
    validationSchema: yup =>
      yup.object().shape({
        name: yup.string().required().min(3).max(250),
        link: yup.string().url(),
        source_id: yup.string().required(),
        investment: yup.number().required().min(0),
        revenues: yup.number().min(0),
        startDate: yup.date().required(),
        endDate: yup.date().min(yup.ref('startDate'), 'Deve ser maior que a data de início')
      }),
    async onSubmit(model: ICampaign) {
      const result = await campaignService.save(model);
      Toast.success(`A campanha ${result.name} foi salva com sucesso`);
      onComplete(result);
    }
  });

  const handleEnter = useCallback(() => {
    form.setValues(data ?? {}, false);
  }, [form, data]);

  const handleExited = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <Dialog open={opened} disableEscapeKeyDown TransitionProps={{ onEnter: handleEnter, onExited: handleExited }}>
      <Form context={form} className={className}>
        <DialogTitle>{form.values.id ? 'Editar a campanha' : 'Cadastre uma nova campanha'}</DialogTitle>
        <DialogContent className='content'>
          <TextField label='Nome da Campanha' name='name' />
          <TextField label='Link' name='link' placeholder='https://minha-campanha.exemplo.com' />
          <SelectField label='Fonte da Campanha' name='source_id' emptyOption='Selecione' options={sources} />

          <Grid.Row>
            <Grid.Column xs={12} sm={6}>
              <CurrencyField label='Valor Investido' name='investment' placeholder='R$' />
            </Grid.Column>
            <Grid.Column xs={12} sm={6}>
              <CurrencyField label='Valor Faturado (Opcional)' name='revenues' placeholder='R$' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column xs={12} sm={6}>
              <DateField label='Data de Início' name='startDate' />
            </Grid.Column>
            <Grid.Column xs={12} sm={6}>
              <DateField label='Data de Término' name='endDate' />
            </Grid.Column>
          </Grid.Row>
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={onCancel}>
            Cancelar
          </Button>
          <Button type='submit' disabled={form.isSubmitting} loading={form.isSubmitting}>
            Salvar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default styled(memo(CampaignForm))`
  & .content {
    width: 600;
    max-width: calc(95vw - 50px);
  }
`;
