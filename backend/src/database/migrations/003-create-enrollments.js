'use strict';
module.exports = {
async up(queryInterface, Sequelize) {
await queryInterface.createTable('enrollments', {
UserId: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
CourseId: { type: Sequelize.INTEGER, references: { model: 'courses', key: 'id' }, onDelete: 'CASCADE' },
createdAt: Sequelize.DATE,
updatedAt: Sequelize.DATE
});
await queryInterface.addConstraint('enrollments', {
fields: ['UserId', 'CourseId'],
type: 'primary key',
name: 'pk_enrollments'
});
},
async down(queryInterface) {
await queryInterface.dropTable('enrollments');
}
};