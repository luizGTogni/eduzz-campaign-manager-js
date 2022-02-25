import { memo, useMemo, useState } from 'react';

import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
  FaGoogle,
  FaYoutubeSquare,
  FaTwitterSquare,
  FaGlobe
} from 'react-icons/fa';

import EditIcon from '@eduzz/houston-icons/DotsHorizontal';
import Table from '@eduzz/houston-ui/Table';

import { ICampaign } from '@/interfaces/models/campaign';
import { formatDate } from '@/utils/formatDate';
import { formatMoney } from '@/utils/formatMoney';

const iconsMap = {
  facebook: FaFacebookSquare,
  instagram: FaInstagramSquare,
  whatsapp: FaWhatsappSquare,
  google: FaGoogle,
  youtube: FaYoutubeSquare,
  twitter: FaTwitterSquare
};

// 'google' | 'tiktok' | 'youtube' | 'twitter' | 'others';

interface IProps {
  data: ICampaign;
  index: number;
  onEdit: (data: ICampaign) => void;
  onDelete?: () => void;
}

const ListItem = memo<IProps>(props => {
  const { data, index } = props;

  const [loading] = useState(false);

  const Icon = useMemo(() => {
    return iconsMap[data.source] ?? FaGlobe;
  }, [data.source]);

  return (
    <Table.Row data={data} index={index}>
      <Table.Cell mobileSize={3}>
        <Icon size={30} />
      </Table.Cell>
      <Table.Cell mobileSize={7}>{data.name}</Table.Cell>
      <Table.Cell mobileSize={6}>
        {formatMoney({
          value: data.investment,
          locales: 'pt-BR',
          currency: 'BRL'
        })}
      </Table.Cell>
      <Table.Cell mobileSize={6}>
        {formatMoney({
          value: data.revenues,
          locales: 'pt-BR',
          currency: 'BRL'
        })}
      </Table.Cell>
      <Table.Cell mobileSize={6}>{formatDate(data.startDate)}</Table.Cell>
      <Table.Cell mobileSize={6}>{formatDate(data.endDate)}</Table.Cell>
      <Table.Cell mobileSize={12} align='right' mobileAlign='left'>
        {(((data.revenues - data.investment) / data.investment) * 100).toFixed(2)}%
      </Table.Cell>
      <Table.ActionLoading show={loading} />
      <Table.Action icon={<EditIcon />} onClick={() => null}></Table.Action>
    </Table.Row>
  );
});

export default ListItem;
