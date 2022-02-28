import { IPaginationParams, IPaginationResponse } from '@eduzz/houston-hooks/usePromisePaginated';

import apiService from './api';

import { ICampaign } from '@/interfaces/models/campaign';

export class CampaignService {
  public list(params: IPaginationParams): Promise<IPaginationResponse<ICampaign>> {
    return apiService.get('/campaigns', params);
  }

  public delete(id: number): Promise<IPaginationResponse<ICampaign>> {
    return apiService.delete('/campaigns', { id });
  }

  public async graphRevenues(): Promise<number> {
    const revenues = await apiService.get('/campaigns/graphs/revenues');

    if (revenues <= 0) {
      return 0;
    }

    return revenues;
  }

  public async graphInvestment(): Promise<number> {
    const investment = await apiService.get('/campaigns/graphs/investment');

    if (investment <= 0) {
      return 0;
    }

    return investment;
  }

  public async graphRoi(): Promise<number> {
    const revenues = await this.graphRevenues();
    const investment = await this.graphInvestment();

    return (revenues - investment) / investment;
  }

  public save(model: Partial<ICampaign>): Promise<ICampaign> {
    return apiService.post('/campaigns', model);
  }
}

const campaignService = new CampaignService();
export default campaignService;
