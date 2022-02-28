import styled, { breakpoints } from '@eduzz/houston-ui/styles/styled';

export const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;

  position: relative;

  display: flex;
  justify-content: flex-end;
`;

export const Wrapper = styled.div`
  width: 500px;
  min-width: 50vw;
  max-width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  ${breakpoints.down('md')} {
    width: 100vw;
  }

  ${breakpoints.down('sm')} {
    padding: ${({ theme }) => theme.spacing(4)};
    font-size: 12px;
  }

  & > .content {
    min-width: 400px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${breakpoints.down('sm')} {
      align-items: flex-start;
      min-width: 0;
    }

    & > div {
      width: 100%;
    }

    .title {
      font-size: 2.4em;
      color: #f5bc0b;
    }

    .subtitle {
      font-size: 1.2em;
    }

    & > .footer {
      margin-top: ${({ theme }) => theme.spacing(8)};
      align-self: flex-start;
    }
  }
`;
