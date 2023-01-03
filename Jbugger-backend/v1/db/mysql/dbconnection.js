const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');
const DIALECT = 'mysql';

// check for env parse
if (dotenv.error) {
    throw dotenv.error;
}

// sequelize object
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        dialect: DIALECT,
        host: process.env.HOST,
        logging: false
    }
)

// export
module.exports = {
    sequelize
};