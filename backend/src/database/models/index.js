const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Importa modelos
db.User = require('./user')(sequelize, DataTypes);
db.Course = require('./course')(sequelize, DataTypes);
db.Enrollment = require('./enrollment')(sequelize, DataTypes);

// Associações
db.User.belongsToMany(db.Course, { through: db.Enrollment });
db.Course.belongsToMany(db.User, { through: db.Enrollment });
db.Enrollment.belongsTo(db.User);
db.Enrollment.belongsTo(db.Course);
db.User.hasMany(db.Enrollment);
db.Course.hasMany(db.Enrollment);

module.exports = db;
