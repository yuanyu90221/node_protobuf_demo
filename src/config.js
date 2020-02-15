const dotenv = require('dotenv');
dotenv.config()
module.exports = {
    PORT: Number(process.env.PORT) || 1433, 
    HOST: process.env.HOST || 'localhost'
};