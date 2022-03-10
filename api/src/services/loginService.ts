import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { NotFoundException } from "../exceptions/NotFoundException";
import { UserRepository } from "../repositories/UserRepository";

class LoginService {
  constructor(private readonly userRepository: UserRepository) {};

  public async doUserLogin(email: string, password: string): Promise<string> {
    const { JWT_SECRET } = process.env;

    const user = await this.userRepository.getUserByCredentials(email, password);

    if (!user) throw new NotFoundException('User not found!');

    const newToken = jwt.sign({ user_id: user.id }, JWT_SECRET, {
      expiresIn: 3600,
    });

    return newToken;
  }

  public async sendResetPassword(email: string): Promise<string> {

    return email;
  }

  public async updatePassword(password: string, token: string): Promise<string> {

    return password + token;
  }
}

export default new LoginService(getCustomRepository(UserRepository));