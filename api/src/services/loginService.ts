import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { NotFoundException } from "../exceptions/NotFoundException";
import { UserRepository } from "../repositories/UserRepository";

import QueueService from './queueService';

class LoginService {
  constructor(private readonly userRepository: UserRepository,
              private readonly queueService: typeof QueueService) {};

  public async doUserLogin(email: string, password: string): Promise<string> {
    const { JWT_SECRET } = process.env;

    const user = await this.userRepository.getUserByCredentials(email, password);

    if (!user) throw new NotFoundException('User not found!');

    const newToken = jwt.sign({ user_id: user.id }, JWT_SECRET, {
      expiresIn: 3600,
    });

    return newToken;
  }

  public async sendResetPassword(email: string): Promise<boolean> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return await this.queueService.sendResetPasswordToQueue({ id: user.id, name: user.name, email: user.email });
  }
}

export default new LoginService(getCustomRepository(UserRepository), QueueService);