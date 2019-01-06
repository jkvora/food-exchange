/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('orders', {
		id: {
			type: DataTypes.INTEGER(32),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		orderCancelled: {
			type: DataTypes.INTEGER(20),
			allowNull: false
		},
		orderDelievered: {
			type: DataTypes.INTEGER(20),
			allowNull: false
		},
		orderNotDelievered: {
			type: DataTypes.INTEGER(20),
			allowNull: false
		},
		orderDate: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'orders',
		timestamps: false,
		defaultScope: {
			attributes: { exclude: ['createdAt', 'updatedAt'] }
		}
	});
};
