require('dotenv').config();

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

console.log("Hello World")

app.use(
    "/",
    function(req, _res, next) {
        console.log(req.method + " " + req.path + " - " + req.ip);
        next();
    }
)
app.use(
    "/",
    bodyParser.urlencoded({"extended": false})
)
app.get(
    "/",
    function(_req, res) {
        // res.send('Hello Express');
        const absolutePath = __dirname + '/views/index.html';
        res.sendFile(absolutePath);
    }
)
app.use(
    '/public',
    express.static(__dirname + '/public')
)
app.get(
    '/json',
    function(_req, res) {
        let helloJson = "";
        process.env.MESSAGE_STYLE == 'uppercase' ? helloJson = "HELLO JSON" : helloJson = "Hello json";
        res.json({"message": helloJson});
    }
)
app.get(
    '/now',
    function(req, _res, next) {
        req.time = new Date().toString();
        next();
    }, function(req, res) {
        res.json({"time": req.time});
    }
)
app.get(
    '/:word/echo',
    function(req, res) {
        res.json({"echo": req.params.word});
    }
)
app.route("/name")
    .get(
        function(req, res) {
            res.json({"name": req.query.first + " " + req.query.last})
        }
    )
    .post(
        function(req, res) {
            res.json({"name": req.body.first + " " + req.body.last});
        }
    )
    
 module.exports = app;
