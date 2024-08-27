'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// add a column to the Tags table named color
		await queryInterface.addColumn('Posts', 'views', {
			type: Sequelize.INTEGER,
			defaultValue: 0
		});
	},
	// eslint-disable-next-line no-unused-vars
	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Posts', 'views');
	}
};
