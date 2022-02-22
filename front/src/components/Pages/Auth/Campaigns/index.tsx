import React, { memo } from 'react';

import Grid from '@eduzz/houston-ui/Grid';
import { IStyledProp } from '@eduzz/houston-ui/styles/styled';

const CampaignsPage: React.FC<IStyledProp> = ({ className }) => {
  return (
    <div className={className}>
      <div className='header'>
        <Grid.Row alignItems='center'>
          <Grid.Column xs={12} sm={true}></Grid.Column>
        </Grid.Row>
      </div>
    </div>
  );
};

export default memo(CampaignsPage);
