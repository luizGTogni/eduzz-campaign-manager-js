import { EntityRepository, getManager, Repository, SelectQueryBuilder } from "typeorm";
import { Campaign } from "../entity/Campaign";
import { NotFoundException } from "../exceptions/NotFoundException";
import IPaginationFilter from "../services/interfaces/IPaginationFilter";

@EntityRepository(Campaign)
export class CampaignRepository extends Repository<Campaign> {
  public listCampaign = async (userID: number, filter: Partial<IPaginationFilter>): Promise<Campaign[]> => {
    const queryBuilder: SelectQueryBuilder<Campaign> = this.createQueryBuilder();
    const all: Campaign[] = await queryBuilder
      .select()
      .take(filter.perPage)
      .skip((filter.page-1) * filter.perPage)
      .orderBy(filter.sort.field, filter.sort.direction)
      .where({ user_id: userID })
      .getMany();
    
    return all;
  }

  public getCampaignByID = async (id: number): Promise<Campaign> => {
    return await this.findOne(id);
  }

  public updateCampaign = async (id: number, data: Partial<Campaign>): Promise<Campaign> => {
    const campaign = await this.findOne(id);

    if (!campaign) throw new NotFoundException('Campanha não Encontrada');

    campaign.startDate = data.startDate;
    campaign.endDate = data.endDate;
    campaign.investment = data.investment;
    campaign.revenues = data.revenues;
    campaign.link = data.link;
    campaign.name = data.name;
    campaign.source_id = data.source_id;

    return await this.save(campaign);
  }

  public createCampaign = async (data: Partial<Campaign>): Promise<Campaign> => {
    const campaign = this.create();

    console.log(new Date());

    campaign.startDate = data.startDate;
    campaign.endDate = data.endDate;
    campaign.investment = data.investment;
    campaign.revenues = data.revenues;
    campaign.link = data.link;
    campaign.name = data.name;
    campaign.source_id = data.source_id;
    campaign.user_id = data.user_id;

    return this.save(campaign);
  }

  public async deleteCampaign(id: number): Promise<any> {
    return await this.delete(id);
  }

  public getInvestment = async (userID: number): Promise<number> => {
    const manager = getManager();
    const rawData = await manager.query(`
        SELECT sum(investment) as investment
          FROM campaign
        WHERE user_id = ?`, [userID]);
    
    const row = rawData[0];

    return Number(row.investment);
  }

  public getRevenue = async (userID: number): Promise<number> => {
    const manager = getManager();
    const rawData = await manager.query(`
        SELECT sum(revenues) as revenues
          FROM campaign
        WHERE user_id = ?`, [userID]);
    
    const row = rawData[0];

    return Number(row.revenues);
  }
}