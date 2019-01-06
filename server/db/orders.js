



var models = require('./../models');
var utils = require('./../utils');

module.exports.getallOrder = function () {
    return new Promise(function (resolve, reject) {
        models.orders.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }).then(data => {
            console.log(data);
            data.sort(utils.sortByDate);
            resolve(data);
        });
    })
}


module.exports.updateOrders = function (obj) {
    return new Promise(function (resolve, reject) {
        var updateOrders = models.orders.build({
            orderCancelled: obj.value,
            orderDelievered: 0,
            orderNotDelievered: 0,
            orderDate: obj.dateTime
        });
        updateOrders.save({ exclude: ['createdAt', 'updatedAt'] }).then(function (insertedRow) {
            resolve(true);
        }).catch(err => resolve(false));
    })


}