import { Router } from 'express';
import CampaignController from '../controllers/CampaignController';
import { postCampaignValidator } from '../validators/postCampaignValidator';
import { validateRequest } from '../validators/validateRequest';

const campaignsRouter = Router();

campaignsRouter.get('/campaigns', CampaignController.getAllCampaigns);
campaignsRouter.post('/campaigns', validateRequest(postCampaignValidator), CampaignController.saveCampaign);
campaignsRouter.delete('/campaign/:id', CampaignController.deleteCampaign);

campaignsRouter.get('/campaign/graphs/investment', CampaignController.getInvestment);
campaignsRouter.get('/campaign/graphs/revenues', CampaignController.getRevenue);

export default campaignsRouter;