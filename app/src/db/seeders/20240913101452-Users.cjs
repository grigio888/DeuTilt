'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	// eslint-disable-next-line no-unused-vars
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					username: 'admin',
					password: '$2b$10$84H35EnW/c7jSygHnGPLkuuuOlaegpjDsCvwXMek4Ogt6DV6ae7Ji',
					email: 'grigio888@deu-tilt.com',
					firstName: 'Vinicius',
					lastName: 'Grigio',
					biography: null,
					createdAt: new Date(),
					updatedAt: new Date(),
					roleId: 3
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
