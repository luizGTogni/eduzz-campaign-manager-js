import ButtonBase from '@mui/material/ButtonBase';
import LinearProgress from '@mui/material/LinearProgress';

import { HoustonIcon } from '@eduzz/houston-icons/interfaces';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

interface ICardProps extends IStyledProp {
  title: string;
  value: string;
  colored?: boolean;
  loading?: boolean;
  icon: HoustonIcon;
  onClick?: () => void;
}

const Card: React.FC<ICardProps> = props => {
  const { className, title, value, icon, loading, onClick } = props;
  const Icon = icon;

  return (
    <ButtonBase className={className} onClick={onClick} disabled={!onClick || loading}>
      <div>
        <Typography size='x-small' fontWeight='bold' className='title'>
          {title}
        </Typography>
        <Typography size='large' className='value'>
          {loading ? 'Carregando...' : value}
        </Typography>
        <Icon className='icon' size={40} />
      </div>
      {loading && <LinearProgress variant='indeterminate' className='loader' />}
    </ButtonBase>
  );
};

export default styled(Card)`
  width: 100%;
  display: block;
  position: relative;

  & > div {
    padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(4)};

    background: ${({ theme, colored }) => (colored ? theme.colors.secondary.main : 'white')};
    border: ${({ theme }) => theme.colors.grey[300]} 1px solid;
    border-radius: ${({ theme }) => theme.radius(1)}px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  & .loader {
    border-bottom-left-radius: ${({ theme }) => theme.radius(1)}px;
    border-bottom-right-radius: ${({ theme }) => theme.radius(1)}px;

    position: absolute;
    left: 1px;
    right: 1px;
    bottom: 1px;
  }

  & .title {
    color: ${({ theme }) => theme.colors.primary.main};
    text-transform: uppercase;
  }

  & .value {
    color: ${({ theme, colored }) => (colored ? theme.colors.secondary.contrastText : theme.colors.text.primary)};
  }

  & .icon {
    color: ${({ theme }) => theme.colors.primary.main};

    position: absolute;
    right: ${({ theme }) => theme.spacing(2)};
    bottom: ${({ theme }) => theme.spacing(2)};
  }
`;
