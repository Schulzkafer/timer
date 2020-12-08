    const express = require("express");
    const bodyParser = require("body-parser");
    const fs = require('fs');

    const app = express();
    const jsonParser = bodyParser.json()
    const urlencodedParser = bodyParser.urlencoded({extended: false});

    app.use(express.static(__dirname + "/public"));

    app.get("/", function(request, response) {
        response.sendFile(__dirname + "/index.html");
    });

    app.get("/getInfo", function (req,res) {
    let content = fs.readFile("history.json", "utf8", function(err,data) {
    if (err) throw Error();
    res.send(data)
    });
    });

    app.post("/saveInfo", jsonParser, function (req,res) {
        console.log(req.body)
        let forSaving = [
        {
        "todayTimeForExam": req.body.examTime,
        "todayTimeForProgramming": req.body.programmingTime
        },
        {
        "examTimeDebt": req.body.examDebt,
        "programmingTimeDebt": req.body.programmingDebt
        }
        ]
        forSaving = JSON.stringify(forSaving);
     let content = fs.writeFile("history.json", forSaving, function(err,data) {
        if (err) throw Error();
        console.log('isOK')
        });

     res.send()
        });

    app.listen(3000, ()=> {console.log('server 3000')});