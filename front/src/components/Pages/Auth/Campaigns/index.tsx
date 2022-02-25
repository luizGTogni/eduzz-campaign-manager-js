import React, { memo } from 'react';

import locale from 'date-fns/locale/pt-BR';
import dateFnsParse from 'date-fns/parse';

import AddIcon from '@eduzz/houston-icons/Add';
import Button from '@eduzz/houston-ui/Button';
import Grid from '@eduzz/houston-ui/Grid';
import { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Table from '@eduzz/houston-ui/Table';
import Typography from '@eduzz/houston-ui/Typography';

import ListItem from './view/ListItem';

const CampaignsPage: React.FC<IStyledProp> = ({ className }) => {
  return (
    <div className={className}>
      <div className='header'>
        <Grid.Row alignItems='center'>
          <Grid.Column xs={12} sm={true}>
            <Typography size='x-large' fontWeight='semibold'>
              Campanhas
            </Typography>
            <Typography>Gerencie suas campanhas</Typography>
          </Grid.Column>

          <Grid.Column xs={12} sm='auto'>
            <Button variant='contained' startIcon={<AddIcon />} fullWidth>
              Cadastrar Nova Campanha
            </Button>
          </Grid.Column>
        </Grid.Row>
      </div>

      <Table mobileWidth={900}>
        <Table.Header>
          <Table.Column width={40}>Fonte</Table.Column>
          <Table.Column>Campanha</Table.Column>
          <Table.Column width={130} align='right'>
            Investimento
          </Table.Column>
          <Table.Column width={130} align='right'>
            Faturamento
          </Table.Column>
          <Table.Column width={120} sortableField='startDate'>
            Início
          </Table.Column>
          <Table.Column width={120} sortableField='endDate'>
            Término
          </Table.Column>
          <Table.Column width={90} align='right'>
            ROI
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <ListItem
            data={{
              id: 2551551,
              source: 'facebook',
              investment: 20000,
              revenues: 32000,
              name: 'Teste de investimento 1',
              startDate: dateFnsParse('25/01/2022', 'dd/MM/yyyy', new Date(), {
                locale
              }),
              endDate: dateFnsParse('25/03/2022', 'dd/MM/yyyy', new Date(), {
                locale
              })
            }}
            index={1}
            onEdit={() => null}
          />
        </Table.Body>
      </Table>
    </div>
  );
};

export default memo(CampaignsPage);
