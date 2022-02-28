import styled from '@eduzz/houston-ui/styles/styled';

export const Container = styled.div`
  height: 100%;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .submit {
      margin-bottom: ${({ theme }) => theme.spacing(4)};
    }

    .social-button {
      margin-top: ${({ theme }) => theme.spacing(4)};
      margin-bottom: ${({ theme }) => theme.spacing(8)};
    }

    .link {
      text-align: center;
      cursor: pointer;
    }
  }
`;
