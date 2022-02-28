import styled, { breakpoints } from '@eduzz/houston-ui/styles/styled';

export const Container = styled.div`
  height: ${({ theme }) => theme.variables.headerHeight}px;
  margin-top: ${({ theme }) => theme.variables.contentPadding * -1}px;
  margin-bottom: ${({ theme }) => theme.variables.contentPadding}px;

  ${breakpoints.up('sm')} {
    margin-top: ${({ theme }) => theme.variables.contentPaddingUpSm * -1}px;
    margin-bottom: ${({ theme }) => theme.variables.contentPaddingUpSm}px;
  }

  & .app-bar {
    width: 100%;

    background-color: #ffffff;
    box-shadow: none;
    padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(6)};
  }

  & .left {
    display: flex;
    align-items: center;
  }

  & .logo {
    max-height: 52px;
    margin-right: ${({ theme }) => theme.spacing(4)};

    float: left;
  }
`;
