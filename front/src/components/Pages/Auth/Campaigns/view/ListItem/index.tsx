import { memo, useMemo, useState, MouseEvent, useCallback } from 'react';

import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
  FaGoogle,
  FaYoutubeSquare,
  FaTwitterSquare,
  FaGlobe,
  FaTiktok
} from 'react-icons/fa';
import { FiDelete, FiEdit, FiEye } from 'react-icons/fi';

import EditIcon from '@eduzz/houston-icons/DotsHorizontal';
import Table from '@eduzz/houston-ui/Table';
import Toast from '@eduzz/houston-ui/Toast';
import Typography from '@eduzz/houston-ui/Typography';

import { StyledTableRow } from './styles';

import Alert from '@/components/Globals/Alert';
import { ICampaign } from '@/interfaces/models/campaign';
import campaignService from '@/services/campaign';
import { formatDate } from '@/utils/formatDate';
import { formatMoney } from '@/utils/formatMoney';

const iconsMap = {
  facebook: FaFacebookSquare,
  instagram: FaInstagramSquare,
  whatsapp: FaWhatsappSquare,
  google: FaGoogle,
  youtube: FaYoutubeSquare,
  twitter: FaTwitterSquare,
  tiktok: FaTiktok
};
interface IProps {
  data: ICampaign;
  index: number;
  onEdit: (data: ICampaign) => void;
  onDeleteComplete?: () => void;
}

const ListItem = memo<IProps>(props => {
  const { data, index, onEdit, onDeleteComplete } = props;

  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const roi = (((data.revenues - data.investment) / data.investment) * 100).toFixed(2);

  const Icon = useMemo(() => {
    return iconsMap[data.source] ?? FaGlobe;
  }, [data.source]);

  const title = useMemo(() => {
    if (data.source === 'others') return 'Outros';

    return data.source.slice(0, 1).toUpperCase() + data.source.slice(1);
  }, [data.source]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = useCallback(() => {
    onEdit(data);
  }, [onEdit, data]);

  const handleDelete = useCallback(async () => {
    const confirm = await Alert.confirm({
      title: 'Excluir campanha',
      message: (
        <Typography>
          Deseja realmente excluir a campanha <strong>{data.name}</strong>
        </Typography>
      ),
      okMessage: 'Excluir'
    });

    if (!confirm) return;

    setLoading(true);

    try {
      await campaignService.delete(data.id);
      setDeleted(true);
      setLoading(false);
      onDeleteComplete && onDeleteComplete();
    } catch (err) {
      Toast.error(`Não foi possivel excluir a campanha ${data.name}.`);
      setDeleted(false);
    }
  }, [onDeleteComplete, data.name, data.id]);

  if (deleted) {
    return null;
  }

  return (
    <StyledTableRow data={data} index={index}>
      <Table.Cell mobileSize={3}>
        <div title={title}>
          <Icon size={30} />
        </div>
      </Table.Cell>
      <Table.Cell mobileSize={7}>{data.name}</Table.Cell>
      <Table.Cell mobileSize={6}>
        {formatMoney({
          value: data.investment,
          locales: 'pt-BR',
          currency: 'BRL'
        })}
      </Table.Cell>
      <Table.Cell mobileSize={6} className='revenues'>
        {formatMoney({
          value: data.revenues,
          locales: 'pt-BR',
          currency: 'BRL'
        })}
      </Table.Cell>
      <Table.Cell mobileSize={6}>{formatDate(data.startDate)}</Table.Cell>
      <Table.Cell mobileSize={6}>{formatDate(data.endDate)}</Table.Cell>
      <Table.Cell mobileSize={12} align='right' mobileAlign='left' className='roi'>
        {roi}%
      </Table.Cell>
      {!loading && (
        <>
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <EditIcon />
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            {data?.link && (
              <MenuItem onClick={() => window.open(data.link)}>
                <ListItemIcon>
                  <FiEye />
                </ListItemIcon>
                <ListItemText>Ver</ListItemText>
              </MenuItem>
            )}
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <FiEdit />
              </ListItemIcon>
              <ListItemText>Editar</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <FiDelete />
              </ListItemIcon>
              <ListItemText>Remover</ListItemText>
            </MenuItem>
          </Menu>
        </>
      )}
    </StyledTableRow>
  );
});

export default ListItem;
