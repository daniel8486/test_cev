module.exports = (sequelize, DataTypes) => {
    const Enrollment = sequelize.define('Enrollment', {}, { tableName: 'enrollments' });
    return Enrollment;
};