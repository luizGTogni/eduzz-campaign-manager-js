import UserService from '../services/userService';
import LoginService from '../services/loginService';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  constructor(private readonly userService: typeof UserService, 
              private readonly loginService: typeof LoginService) {}

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const newToken = await this.loginService.doUserLogin(email, password);

      return res.json({
        token: newToken,
      });
    } catch (err) {
      res.status(404).json({
        message: "Usuário não encontrado"
      })
    }
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      console.log('aqui no create user');

      const user = await this.userService.createUser(data);
      
      console.log('aqui');
      return res.json(user);
    } catch (err) {
      next(err);
      console.log('error');
    }
  }

  public profile = async (req: Request, res: Response) => {
    const userID = req.body.user_id || undefined;
    const profile = await this.userService.getProfile(userID);

    return res.json(profile);
  }

  public sendReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      await this.loginService.sendResetPassword(email);
      return res.json(true);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, token } = req.body;
      await this.loginService.updatePassword(password, token);
      return res.json(true);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default new AuthController(UserService, LoginService);