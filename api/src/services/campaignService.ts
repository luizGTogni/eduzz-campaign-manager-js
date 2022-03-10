import { getCustomRepository } from "typeorm";
import { Campaign } from "../entity/Campaign";
import { CampaignRepository } from "../repositories/CampaignRepository";
import IListResult from "./interfaces/IListResult";
import IPaginationFilter from "./interfaces/IPaginationFilter";

class CampaignService {
  constructor(private readonly campaignRepository: CampaignRepository) {};

  public getAllCampaigns = async (userID: number, filter: Partial<IPaginationFilter>): Promise<IListResult<Campaign>> => {
    const campaigns: Campaign[] = await this.campaignRepository.listCampaign(userID, filter);
    return {
      total: campaigns.length,
      result: campaigns
    }
  }

  public getCampaign = async (id: number): Promise<Campaign> => {
    const campaign = await this.campaignRepository.getCampaignByID(id);
    return campaign;
  }

  public saveCampaign = async (data: any): Promise<Campaign> => {
    const { id } = data;
    const campaign = (!id) ? 
                        await this.createCampaign(data) : 
                        await this.updateCampaign(data.id, data);
    return campaign;
  }

  public createCampaign = async (data: any): Promise<Campaign> => {
    const campaign = await this.campaignRepository.createCampaign(data);
    return campaign;
  }

  public updateCampaign = async (id: number, data: any): Promise<Campaign> => {
    const campaign = await this.campaignRepository.updateCampaign(id, data);
    return campaign;
  }

  public deleteCampaign = async (id: number): Promise<any> => {
    const result = await this.campaignRepository.deleteCampaign(id);
    return result;
  }

  public getInvestment = async (userID: number): Promise<number> => {
    const result = await this.campaignRepository.getInvestment(userID);
    return result;
  }
  
  public getRevenue = async (userID: number): Promise<number> => {
    const result = await this.campaignRepository.getRevenue(userID);
    return result;
  }
}

export default new CampaignService(getCustomRepository(CampaignRepository));