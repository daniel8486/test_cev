'use strict';
module.exports = {
async up(queryInterface, Sequelize) {
await queryInterface.createTable('courses', {
id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
name: { type: Sequelize.STRING, allowNull: false },
description: { type: Sequelize.TEXT },
status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' },
createdAt: Sequelize.DATE,
updatedAt: Sequelize.DATE
});
},
async down(queryInterface) {
await queryInterface.dropTable('courses');
}
};