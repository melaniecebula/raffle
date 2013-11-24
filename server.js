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
    url = "https://graph.facebook.com/439024929535684/attending/?access_token=CAACEdEose0cBAE7kE7CGMVJCxIdZAmGPDh7axNyjI3TuiCjUjhxYJSxvo2Y57NO6nqBrK2YgykA75skdCJsKrZC7KK2ZBxdaPQkHAQCCADZBjYRNEEnKJELLORBjNvyuAP44AZBqY7srUhgVHlQzR680KfJmtXNEcuVCpZAaNKCWED2jcPtHopmhhjkqtDuyxYvEFZCmNyL7AZDZD"
    request.get(url, function(error, response, body) {
        var data = JSON.parse(body);
        //console.log(data);
        //console.log(data["data"]);
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
        var pic = "http://graph.facebook.com/" + id + "/picture?type=large";
        console.log(pic);
        res.render("index.ejs", {winner: winner, pic : pic});
    });
});

app.listen(8000);
console.log('Listening on port 8000');
