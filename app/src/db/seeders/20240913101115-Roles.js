'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Roles', [
            {
                slug: 'user',
                title: 'Usuário',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                slug: 'moder',
                title: 'Moderador',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                slug: 'admin',
                title: 'Administrador',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Roles', null, {});
    }
};