import React, { useCallback, useState } from 'react';

import usePromisePaginated from '@eduzz/houston-hooks/usePromisePaginated';
import AddIcon from '@eduzz/houston-icons/Add';
import Button from '@eduzz/houston-ui/Button';
import Grid from '@eduzz/houston-ui/Grid';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Table from '@eduzz/houston-ui/Table';
import Typography from '@eduzz/houston-ui/Typography';

import CampaignCards from './view/Cards';
import CampaignForm from './view/Form';
import ListItem from './view/ListItem';

import Toolbar from '@/components/Layout/Toolbar';
import { ICampaign } from '@/interfaces/models/campaign';
import campaignService from '@/services/campaign';

const CampaignsPage: React.FC<IStyledProp> = ({ className }) => {
  const [formOpened, setFormOpened] = useState(false);
  const [current, setCurrent] = useState<ICampaign>({} as ICampaign);

  const { params, isLoading, total, refresh, result, error, handleSort, handleChangePage, handleChangePerPage } =
    usePromisePaginated(
      {
        initialParams: {
          page: 1,
          perPage: 10,
          sort: { field: 'startDate', direction: 'desc' }
        },
        onChangeParams: params => campaignService.list(params)
      },
      []
    );

  const formCallback = useCallback(() => {
    setFormOpened(false);
    refresh();
  }, [refresh]);

  const formCancel = useCallback(() => setFormOpened(false), []);

  const handleCreate = useCallback(() => {
    setFormOpened(true);
    setCurrent(null);
  }, []);

  const handleEdit = useCallback((current: ICampaign) => {
    setFormOpened(true);
    setCurrent(current);
  }, []);

  return (
    <div className={className}>
      <Toolbar />

      <CampaignCards />
      <CampaignForm opened={formOpened} data={current} onComplete={formCallback} onCancel={formCancel} />

      <div className='header'>
        <Grid.Row alignItems='center'>
          <Grid.Column xs={12} sm={true}>
            <Typography size='x-large' fontWeight='semibold'>
              Campanhas
            </Typography>
            <Typography>Gerencie suas campanhas</Typography>
          </Grid.Column>

          <Grid.Column xs={12} sm='auto'>
            <Button variant='contained' startIcon={<AddIcon />} onClick={handleCreate} fullWidth>
              Cadastrar Nova Campanha
            </Button>
          </Grid.Column>
        </Grid.Row>
      </div>

      <Table loading={isLoading} mobileWidth={900} sort={params.sort} onSort={handleSort}>
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
          <Table.Column width={90} align='center'>
            Ações
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {!error && <Table.Empty count={total} />}
          <Table.Error error={error} />
          {result.map((data, index) => (
            <ListItem key={data.id} data={data} index={index} onEdit={handleEdit} />
          ))}
        </Table.Body>
        <Table.Pagination
          total={total}
          page={params.page}
          perPage={params.perPage}
          onChangePage={handleChangePage}
          onChangePerPage={handleChangePerPage}
        />
      </Table>
    </div>
  );
};

export default styled(CampaignsPage)`
  & > .header {
    margin: ${({ theme }) => theme.spacing(8)} 0;
  }
`;
