import styled from 'styled-components';

import Table from '@eduzz/houston-ui/Table';

import { ICampaign } from '@/interfaces/models/campaign';

interface IProps {
  data: ICampaign;
}

export const StyledTableRow = styled(Table.Row)<IProps>`
  & .revenues {
    color: #25af0f;
  }

  & .roi {
    color: ${({ data }) =>
      (data.investment > data.revenues && 'red') || (data.investment < data.revenues && '#25af0f') || 'yellow'};
  }
`;
