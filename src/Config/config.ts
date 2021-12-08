require('dotenv').config();

const type = 'postgres';
const host = 'ec2-54-220-166-184.eu-west-1.compute.amazonaws.com';
const port = Number(5432);
const username = 'rguwsfiigvqpkx';
const password =
  'fabcf8f4293331d668a62228764886e9fa94fabe6928f4c99c00d497188f403a';
const database = 'dd75tmti3i0ego';

export const config = {
  TYPE: process.env.TYPE || type,
  HOST: process.env.HOST || host,
  PORT: Number(process.env.PORT) || port,
  USERNAME: process.env.USERNAME || username,
  PASSWORD: process.env.PASSWORD || password,
  DATABASE: process.env.DATABASE || database,

  SERVER_PORT: process.env.SERVER_PORT || 3000,
  SECRET: process.env.SECRET,
};
