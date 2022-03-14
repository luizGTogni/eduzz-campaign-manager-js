import jwt from 'jsonwebtoken';
import { Channel, connect, Connection } from 'amqplib';
import { RABBIT_DSN } from '../settings';

interface ISendResetPasswordData {
  id: number;
  name: string;
  email: string;
}

class QueueService {
  private connection: Connection;
  private channel: Channel;

  private getConnection = async (): Promise<Connection> => {
    if (!this.connection) {
      this.connection = await connect(RABBIT_DSN);
    }

    return this.connection;
  }

  private getChannel = async (): Promise<Channel> => {
    if (!this.channel) {
      const conn = await this.getConnection();
      this.channel = await conn.createChannel();
    }

    return this.channel;
  }

  private sendToQueue = async (queue: string, data: any): Promise<boolean> => {
    const channel = await this.getChannel();
    return channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  }

  sendResetPasswordToQueue = async (data: ISendResetPasswordData): Promise<boolean> => {
    const { JWT_SECRET, APP_LINK } = process.env;

    const newToken = jwt.sign({ id: data.id, name: data.name, email: data.email }, JWT_SECRET, {
      expiresIn: 3600,
    });

    const link = `${APP_LINK}/new-password?t=${newToken}`;
    return await this.sendToQueue('user.password.reset', {...data, link});
  }
}

export default new QueueService();