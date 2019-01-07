



var models = require('../models');
var utils = require('../utils');

module.exports.getallMetrics = function () {
    return new Promise(function (resolve, reject) {
        Promise.all(
            [
                models.orders.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                })
                , models.customers.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                })])
            .then(data => {
                console.log(data);
                let obj = { orders: data[0], customers: data[1] }
                //  data.sort(utils.sortByDate);
                resolve(obj);
            });
    })
}


module.exports.updateOrders = function (obj) {
    return new Promise(function (resolve, reject) {

        let updatedObj = getupdateObject(obj);
        if (obj.updateType == 1 || obj.updateType == 2 || obj.updateType == 3) {

            var updateOrders = models.orders.build(updatedObj);
            updateOrders.save({ exclude: ['createdAt', 'updatedAt'] }).then(function (insertedRow) {
                resolve(true);
            }).catch(err => resolve(false));
        }
        else {
            var updateCustomers = models.customers.build(updatedObj);
            updateCustomers.save({ exclude: ['createdAt', 'updatedAt'] }).then(function (insertedRow) {
                resolve(true);
            }).catch(err => resolve(false));
        }

    })


}

function getupdateObject(obj) {
    switch (obj.updateType) {
        case 1: {
            //cancelled
            return data = {
                orderCancelled: obj.value,
                orderDelievered: 0,
                orderNotDelievered: 0,
                orderDate: obj.dateTime
            }
        }
        case 2: {
            //delievered
            return data = {
                orderCancelled: 0,
                orderDelievered: obj.value,
                orderNotDelievered: 0,
                orderDate: obj.dateTime
            }
        }
        case 3: {
            // not delievered
            return data = {
                orderCancelled: 0,
                orderDelievered: 0,
                orderNotDelievered: obj.value,
                orderDate: obj.dateTime
            }
        }
        default: {
            return data = {
                crcount: obj.value,
                Date: obj.dateTime
            }
        }

    }
}