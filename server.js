var express = require('express');
var request = require('request');
var app = express();

app.configure(function() {
    app.use(express.compress());
    app.set("views", __dirname + "/views");
    app.set("view engine", "ejs");
    app.use(express["static"] (__dirname + "/static"));
    app.use(app.router);
});

app.get("/", function(req,res) {
    url = "https://graph.facebook.com/439024929535684/attending/?access_token=CAACEdEose0cBACND7LVYyB5wBOOzl3SS5ncsbjncHXhW6M3sLtuMLkKYxg84cGQSA6jgAXu16rKvA2jEt2srdbzK826jOXN7cIc7DZAjQIdhDZB0vG2kjIgngs0IZATvHgJIv2CiSyjlyVHgNxmWq7XRX3kAtNPPKSJ9ZBc6C63aYOSuMdUIB7aPgV9plZBGTNgNC2xwj1wZDZD"
    request.get(url, function(error, response, body) {
        var data = JSON.parse(body);
        //console.log(data);
        //console.log(data["data"]);
        //https://graph.facebook.com/endpoint?key=value&access_token=app_id|app_secret
        var people = {};
        var ppl = new Array();
        for (var person in data["data"]) {
            //console.log(data["data"][person]["name"]);
            people[data["data"][person]["name"]] = [data["data"][person]["id"]];
            ppl.push(data["data"][person]["name"]);
        }
        var winner = ppl[Math.floor(Math.random() * ppl.length)];
        console.log(winner);
        console.log(people[winner]);
        var id = people[winner];
        var pic = "http://graph.facebook.com/" + id + "/picture?width=500&height=500";
        console.log(pic);
        res.render("index.ejs", {winner: winner, pic : pic});
    });
});

app.listen(8000);
console.log('Listening on port 8000');
