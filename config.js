require('dotenv').config();

const {
  PORT = 3000,
  DB = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET = 'JWT_SECRET',
} = process.env;

module.exports = {
  PORT,
  DB,
  JWT_SECRET,
};
