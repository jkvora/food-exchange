/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('customers', {
		srno: {
			type: DataTypes.INTEGER(32),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		crcount: {
			type: DataTypes.INTEGER(20),
			allowNull: false
		},
		Date: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'customers',
		timestamps: false,
		defaultScope: {
			attributes: { exclude: ['createdAt', 'updatedAt'] }
		}
	});
};
