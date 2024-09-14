'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	// eslint-disable-next-line no-unused-vars
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Tags', [
            {
                slug: 'hardware',
                title: 'Hardware',
                createdAt: new Date(),
                updatedAt: new Date(),
                color: '#2C3E50',
                icon: 'cpu'
            },
            {
                slug: 'software',
                title: 'Software',
                createdAt: new Date(),
                updatedAt: new Date(),
                color: '#3B5998',
                icon: 'code'
            },
            {
                slug: 'gaming',
                title: 'Jogos',
                createdAt: new Date(),
                updatedAt: new Date(),
                color: '#da2800',
                icon: 'device-gamepad-2'
            },
            {
                slug: 'xbox',
                title: 'Xbox',
                createdAt: new Date(),
                updatedAt: new Date(),
                color: '#107b10',
                icon: 'brand-xbox'
            },
            {
                slug: 'playstation',
                title: 'PlayStation',
                createdAt: new Date(),
                updatedAt: new Date(),
                color: '#0072ce',
                icon: 'icons'
            },
            {
                slug: 'PC',
                title: 'PC',
                createdAt: new Date(),
                updatedAt: new Date(),
                color: '#277ac2',
                icon: 'brand-steam'
            },
            {
                slug: 'mobile',
                title: 'Portátil',
                createdAt: new Date(),
                updatedAt: new Date(),
                color: '#1ABC9C',
                icon: 'device-mobile'
            },
            {
                slug: 'desktop',
                title: 'De mesa',
                createdAt: new Date(),
                updatedAt: new Date(),
                color: '#7F8C8D',
                icon: 'device-desktop'
            },
            {
                slug: 'nintendo',
                title: 'Nintendo',
                createdAt: new Date(),
                updatedAt: new Date(),
                color: 'red',
                icon: 'device-nintendo'
            },
            {
                slug: 'emulation',
                title: 'Emulação',
                createdAt: new Date(),
                updatedAt: new Date(),
                color: '#FF7F00',
                icon: 'ghost'
            }
        ], {});
    },

	// eslint-disable-next-line no-unused-vars
    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Tags', null, {});
    }
};