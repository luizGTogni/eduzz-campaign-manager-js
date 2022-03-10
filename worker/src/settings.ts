import 'dotenv/config';

export const IS_PROD = false;

export const RABBIT_HOST = IS_PROD ? '' : process.env.RABBIT_HOST
export const RABBIT_USER = IS_PROD ? '' : process.env.RABBIT_USER
export const RABBIT_PASSWORD = IS_PROD ? '' : process.env.RABBIT_PASSWORD
export const RABBIT_PORT = IS_PROD ? 5672 : process.env.RABBIT_PORT
export const RABBIT_DSN = `${RABBIT_HOST}`;

export const SENDGRID_TOKEN = process.env.SENDGRID_TOKEN || '';