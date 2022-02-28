import styled, { breakpoints } from '@eduzz/houston-ui/styles/styled';

export const Container = styled.div`
  margin: calc(${({ theme }) => theme.spacing(8)} * -1);

  ${breakpoints.down('sm')} {
    margin: calc(${({ theme }) => theme.spacing(4)} * -1);
  }

  .step {
    padding: ${({ theme }) => theme.spacing(8)};
    height: 100%;
    max-width: 450px;
    margin: auto;

    ${breakpoints.down('sm')} {
      padding: ${({ theme }) => theme.spacing(4)};
    }
  }
`;
