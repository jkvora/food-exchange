var mysql = require('mysql2');
var Sequelize = require('sequelize');
var SequelizeAuto = require('sequelize-auto');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'JalakVora*1994',
  database: 'faasos',
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

const sequelize = new Sequelize('faasos', 'root', 'JalakVora*1994', {
  dialect: 'mysql',
  host: '127.0.0.1'
})


var auto = new SequelizeAuto('faasos', 'root', 'JalakVora*1994', {
  dialect: 'mysql',
  host: '127.0.0.1',
  tables:['orders']
});




module.exports = { connection,sequelize,auto};