const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors');

var orderDll = require('./db/orders');

const app = express();


var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



/**
 * Mysql Config file (based on node process enviornment)
 */
var mysqlDb = require('./config/mysql/mysql.connection');

// mysqlDb.auto.run(function (err) {
//     if (err) throw err;
// });


//Connect mysql 
mysqlDb.connection.connect();

//Listen on port 3000
server = app.listen(3000, () => {
    console.log("server started");
})


//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected')


    //listen on new_message
    socket.on('message', (data) => {
        //broadcast the new message
        console.log(data);
        // io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })


})



app.get('/allorders', function (req, res) {
    orderDll.getallOrder().then(output => {
        res.send(output);
    }).catch(err => {
        res.send([]);
    })
})

app.post('/updateorders', function (req, res) {
    orderDll.updateOrders(req.body).then(updated => {
        if (updated) {
            orderDll.getallOrder().then(output => {
                res.send(output);
                io.sockets.send(output);
            }).catch(err => {
                res.send([]);
            })
        }
        else {
            res.send([]);
        }
    })

});


