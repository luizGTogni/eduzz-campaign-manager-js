import styled, { breakpoints } from '@eduzz/houston-ui/styles/styled';

import splashImage from '@/assets/images/splash.png';

export const Container = styled.div`
  width: 100%;
  display: flex;

  position: relative;

  ${breakpoints.down('md')} {
    display: none;
    visibility: hidden;
  }

  .opacity {
    width: 100%;
    height: 100%;

    background: linear-gradient(180deg, rgba(7, 45, 131, 0.5) 0%, rgba(7, 45, 131, 0.7) 100%);

    position: absolute;
    z-index: 9;
  }

  .content {
    width: 100%;
    height: 100%;

    color: #ffffff;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: absolute;
    z-index: 10;

    & > .logo {
      width: 300px;
      max-width: 100%;
      max-height: 120px;
    }

    .title {
      margin-top: ${({ theme }) => theme.spacing(8)};
    }

    .subtitle {
      width: 80%;
      text-align: center;
    }
  }

  .image {
    background: url(${splashImage}) no-repeat center;
    background-size: cover;
    flex: 1;
  }
`;
