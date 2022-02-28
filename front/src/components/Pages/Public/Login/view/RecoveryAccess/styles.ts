import styled from '@eduzz/houston-ui/styles/styled';

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    margin-top: 50%;

    .submit {
      margin-bottom: ${({ theme }) => theme.spacing(4)};
    }

    .link {
      text-align: center;
      cursor: pointer;
    }
  }
`;
