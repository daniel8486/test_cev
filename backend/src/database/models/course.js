module.exports = (sequelize, DataTypes) => {
const Course = sequelize.define('Course', {
name: { type: DataTypes.STRING, allowNull: false },
description: { type: DataTypes.TEXT },
status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' }
}, { tableName: 'courses' });
return Course;
};