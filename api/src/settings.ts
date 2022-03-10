export const IS_DEVELOPMENT=true;

export const RABBIT_HOST = process.env.RABBIT_HOST
export const RABBIT_USER = process.env.RABBIT_USER
export const RABBIT_PASSWORD = process.env.RABBIT_PASSWORD
export const RABBIT_PORT = process.env.RABBIT_PORT
export const RABBIT_DSN = IS_DEVELOPMENT ? `${RABBIT_HOST}` : ``;