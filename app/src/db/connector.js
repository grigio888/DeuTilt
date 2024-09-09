import { Sequelize } from 'sequelize';

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	logging: false,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    },
    dialectOptions: {
        charset: 'utf8',
    },
});

export default sequelize;
