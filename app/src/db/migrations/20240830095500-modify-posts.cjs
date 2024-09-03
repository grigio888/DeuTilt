'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// add a column to the Tags table named subTitle
		await queryInterface.addColumn('Posts', 'subTitle', {
			type: Sequelize.STRING
		});
	},
	// eslint-disable-next-line no-unused-vars
	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Posts', 'subTitle');
	}
};
