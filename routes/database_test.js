var pg = require('pg');
var conString = "postgres://postgres:@localhost:5432/cardgame";
var client = new pg.Client(conString);

client.connect(function (err, client, done) {

    if (err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO test(name) VALUES($1)', ["senorsen"],
        function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
        });

});