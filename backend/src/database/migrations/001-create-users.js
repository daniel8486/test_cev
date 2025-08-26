'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
       id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
       },
       name: { 
        type: Sequelize.STRING, 
        allowNull: false 
       },
       email: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true },
       password: { 
        type: Sequelize.STRING, 
        allowNull: false 
       },
       role: { 
        type: Sequelize.ENUM('student', 'teacher'), defaultValue: 'student' 
       },
       createdAt: Sequelize.DATE,
       updatedAt: Sequelize.DATE
    });
}, 
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};