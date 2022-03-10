import sendgrid from '@sendgrid/mail';
import { Channel, connect, Connection } from 'amqplib';
import { RABBIT_DSN, SENDGRID_TOKEN } from './settings';

(async () => {
  sendgrid.setApiKey(SENDGRID_TOKEN);

  let connection: Connection = await connect(RABBIT_DSN);
  let channel: Channel = await connection.createChannel();

  channel.assertQueue('user.password.reset');
  channel.prefetch(1);
  channel.consume('user.password.reset', async msg => {
    if (!msg) return;

    const json = msg.content.toString() || '';
    const { name, email, link } = JSON.parse(json);

    const body = {
      to: `${name} <${email}>`,
      from: 'trueluizbr@gmail.com',
      subject: 'Recuperação de senha',
      html: `<p>Olá... acesse o link abaixo para resetar a sua senha</p>
             <p><a href='${link}'>${link}</a></p>`,
    }

    try {
      await sendgrid.send(body);
      channel.ack(msg);
    } catch (err: any) {
      console.log(err.response.body);
    }
  }, {
    noAck: false,
  });
})();