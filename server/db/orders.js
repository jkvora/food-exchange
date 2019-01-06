



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

        let updatedObj = getupdateObject(obj);
        var updateOrders = models.orders.build(updatedObj);
        updateOrders.save({ exclude: ['createdAt', 'updatedAt'] }).then(function (insertedRow) {
            resolve(true);
        }).catch(err => resolve(false));
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

    }
}