import { Request, Response } from "express";
import { Campaign } from "../entity/Campaign";
import CampaignService from "../services/campaignService";
import IListResult from "../services/interfaces/IListResult";
import IPaginationFilter from "../services/interfaces/IPaginationFilter";

class CampaignController {
  constructor(private readonly campaignService: typeof CampaignService) {};

  private sanitizeFilter = (req: Request): IPaginationFilter => {
    const { page, perPage, sort } = req.query;
    const { field, direction } = JSON.parse(sort.toString());

    const filter: IPaginationFilter = {
      page: Number(page),
      perPage: Number(perPage),
      sort: {
        field,
        direction: direction.toUpperCase()
      }
    };

    const mapSortFilterFields = [
      { incoming: 'startDate', to: 'start_date' },
      { incoming: 'endDate', to: 'end_date' } 
    ];

    if (mapSortFilterFields.some(x => x.incoming === filter.sort.field)) {
      filter.sort.field = mapSortFilterFields.filter(map => map.incoming === filter.sort.field).pop().to;
    }

    return filter;
  }

  public getAllCampaigns = async (req: Request, res: Response) => {
    const userID = res.locals.user_id;
    const filter: IPaginationFilter = this.sanitizeFilter(req);

    const campaigns: IListResult<Campaign> = await this.campaignService.getAllCampaigns(userID, filter);

    return res.json(campaigns);
  }

  public getCampaign = async (req: Request, res: Response) => {
    const id = Number(req.params['id']);
    const campaign = await this.campaignService.getCampaign(id);
    return res.json(campaign);
  }

  public saveCampaign = async (req: Request, res: Response) => {
    const data = {...req.body, user_id: res.locals.user_id };
    const campaign = await this.campaignService.saveCampaign(data);
    return res.json(campaign);
  }

  public updateCampaign = async (req: Request, res: Response) => {
    const id = Number(req.params['id']);
    const data = req.body;
    const campaign = await this.campaignService.updateCampaign(id, data);
    return res.json(campaign);
  }

  public deleteCampaign = async (req: Request, res: Response) => {
    const id = Number(req.params['campaignID']);
    const campaign = await this.campaignService.deleteCampaign(id);
    return res.json(campaign);
  }

  public getInvestment = async (req: Request, res: Response) => {
    const userID = res.locals.user_id;
    const total = await this.campaignService.getInvestment(userID);

    return res.send(total.toString());
  }

  public getRevenue = async (req: Request, res: Response) => {
    const userID = res.locals.user_id;
    const total = await this.campaignService.getRevenue(userID);

    return res.send(total.toString());
  }
}

export default new CampaignController(CampaignService);