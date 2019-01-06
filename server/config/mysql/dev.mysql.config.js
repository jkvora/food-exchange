var mysql = require('mysql2');
var Sequelize = require('sequelize');
var SequelizeAuto = require('sequelize-auto');

var env       = process.env.NODE_ENV || 'development';
var config    =  require(__dirname + '/../config.json')[env];

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: config.username,
  password: config.password,
  database: config.database,
  timeout:  60000,
  multipleStatements: true,
  typeCast : function castField(field, useDefaultTypeCasting ) {
    if ((field.type === "BIT") && (field.length === 1)) {
        var bytes = field.buffer();
        if (bytes === null) {
            // Need to check this condition as few Bool columns are kept as Nullable
            return false
        }
        return (bytes[0] === 1);
    }
    return(useDefaultTypeCasting());
}
});

const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: 'mysql',
  host: '127.0.0.1'
})


var auto = new SequelizeAuto(config.database, config.username, config.password , {
  dialect: 'mysql',
  host: '127.0.0.1',
  tables:['orders','customers']
});




module.exports = { connection,sequelize,auto};