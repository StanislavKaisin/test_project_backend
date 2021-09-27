require('dotenv').config();

export const config = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
};
