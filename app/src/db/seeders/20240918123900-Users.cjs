'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	// eslint-disable-next-line no-unused-vars
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					username: 'visitor',
					password: 'this-password-cant-be-matched',
					email: 'visitor@deu-tilt.com',
					firstName: 'Vinicius',
					lastName: 'Grigio',
					biography: null,
					createdAt: new Date(),
					updatedAt: new Date(),
					roleId: 1
				}
			],
			{}
		);
	},

	// eslint-disable-next-line no-unused-vars
	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	}
};
