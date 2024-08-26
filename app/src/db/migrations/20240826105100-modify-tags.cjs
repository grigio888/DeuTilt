'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// add a column to the Tags table named color
		await queryInterface.addColumn('Tags', 'icon', {
			type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'none'
		});
	},
	// eslint-disable-next-line no-unused-vars
	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Tags', 'icon');
	}
};
