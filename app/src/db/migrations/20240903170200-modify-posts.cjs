'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Posts', 'editedBy', {
			type: Sequelize.INTEGER
		});
		await queryInterface.addColumn('Posts', 'editedAt', {
			type: Sequelize.DATE
		});
		await queryInterface.addColumn('Posts', 'published', {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		});
		await queryInterface.addColumn('Posts', 'publishedAt', {
			type: Sequelize.DATE
		});
	},
	// eslint-disable-next-line no-unused-vars
	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Posts', 'editedBy');
		await queryInterface.removeColumn('Posts', 'editedAt');
		await queryInterface.removeColumn('Posts', 'published');
		await queryInterface.removeColumn('Posts', 'publishedAt');
	}
};
