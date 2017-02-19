var pg = require('pg');
var conString = "postgres://postgres:@localhost:5432/cardgame";
var client = new pg.Client(conString);

function insert(sql, data) {
    let re;
    client.connect(function (err, client, done) {

        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(sql, [data],
            function (err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                console.log(result);
                re = result;
            });

    });
    return re;
}

function create(sql) {
    let re;
    client.connect(function (err, client, done) {

        if (err) {
            return console.error('error fetching client from pool', err);
        }

        console.log("Creating table");
        query = client.query(sql);
        query.on('end', function () {
            console.log("Created!");
        });

    });
    return re;
}

function createCreatureTable() {
    create("create table creature(id serial primary key, " +
        "name text, " +
        "description text, " +
        "atk integer, " +
        "life integer, " +
        "cost integer, " +
        "saintShield boolean," +
        "rush boolean," +
        "taunt boolean," +
        "race integer," +
        "battlecry int[]," +
        "deathwhisper int[]," +
        "perks int[]);");
}


function deprecated() {

}

createCreatureTable();
