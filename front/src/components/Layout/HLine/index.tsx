import { memo } from 'react';

import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';

const HLine = memo<IStyledProp>(({ className }) => {
  return <div className={className}></div>;
});

export default styled(HLine)`
  border-bottom: 1px solid #000000;
`;
