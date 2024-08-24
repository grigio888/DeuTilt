'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// add a column to the Users table named role
		await queryInterface.addColumn('Users', 'roleId', {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 1
		});
	},
	// eslint-disable-next-line no-unused-vars
	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Users', 'role');
	}
};
