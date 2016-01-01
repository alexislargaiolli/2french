/**
 * Created by alex on 19/09/15.
 */
var Sails = require('sails'),
    sails,
    Barrels = require('barrels');

before(function(done) {

    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(10000);

    Sails.lift({
        log: {
            level: 'debug'
        },
        models: {
            connection: 'test',
            migrate: 'drop'
        },
        email:{
            testMode : true
        }
    }, function(err, server) {
        sails = server;
        if (err) return done(err);

        // Load fixtures
        var barrels = new Barrels();

        // Populate the DB
        barrels.populate(function(err) {
            done(err);
        });

        //done(err, sails);
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    Sails.lower(done);
});