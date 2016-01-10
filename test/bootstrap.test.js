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
        port:9990,
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
        barrels.populate(['user'],function(err) {
            if(err){
                sails.log.error(err);
                return done(err);
            }
            barrels.populate(['passport', 'formation', 'profile', 'diploma', 'reservation','review', 'postcategory', 'post'],function(err) {
                if(err){
                    sails.log.error(err);
                    return done(err);
                }
                done();
            }, false);
        },false);
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    Sails.lower(done);
});