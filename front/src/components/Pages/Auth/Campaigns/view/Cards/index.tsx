import React, { memo } from 'react';

import usePromiseRefresh from '@eduzz/houston-hooks/usePromiseRefresh';
import CartOutlineIcon from '@eduzz/houston-icons/CartOutline';
import MoneyIcon from '@eduzz/houston-icons/Money';
import UpdateIcon from '@eduzz/houston-icons/Update';
import Grid from '@eduzz/houston-ui/Grid';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';

import Card from './Card';

import campaignService from '@/services/campaign';
import { formatMoney } from '@/utils/formatMoney';

const CampaignsCards: React.FC<IStyledProp> = ({ className }) => {
  const [roi, , roiLoading, roiRefresh] = usePromiseRefresh(async () => {
    const data = await campaignService.graphRoi();

    return (data * 100).toFixed(2) + '%';
  }, []);

  const [revenues, , revenuesLoading, revenuesRefresh] = usePromiseRefresh(async () => {
    const v = await campaignService.graphRevenues();
    return formatMoney({ value: v, locales: 'pt-BR', currency: 'BRL' });
  }, []);

  const [investment, , investmentLoading, investmentRefresh] = usePromiseRefresh(async () => {
    const v = await campaignService.graphInvestment();
    return formatMoney({ value: v, locales: 'pt-BR', currency: 'BRL' });
  }, []);

  const handleRefresh = () => {
    roiRefresh();
    investmentRefresh();
    revenuesRefresh();
  };

  return (
    <div className={className}>
      <Grid.Row>
        <Grid.Column xs={12} md={4}>
          <Card
            title='média de roi das campanhas'
            value={roi}
            loading={roiLoading}
            onClick={handleRefresh}
            icon={UpdateIcon}
            colored
          />
        </Grid.Column>
        <Grid.Column xs={12} md={4}>
          <Card
            title='Valor total faturado'
            value={revenues}
            loading={revenuesLoading}
            onClick={handleRefresh}
            icon={CartOutlineIcon}
            colored
          />
        </Grid.Column>
        <Grid.Column xs={12} md={4}>
          <Card
            title='Valor total investido'
            value={investment}
            loading={investmentLoading}
            onClick={handleRefresh}
            icon={MoneyIcon}
            colored
          />
        </Grid.Column>
      </Grid.Row>
    </div>
  );
};

export default styled(memo(CampaignsCards))`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;
