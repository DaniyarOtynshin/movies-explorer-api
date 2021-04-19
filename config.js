require('dotenv').config();

const {
  PORT = 3000,
  DB = '//localhost:27017/mestodb',
  JWT_SECRET = 'JWT_SECRET'
} = process.env;

module.exports = {
  PORT,
  DB,
  JWT_SECRET,
};
