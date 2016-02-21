/**
 * Created by alex on 20/02/16.
 */
var assert = require('assert'),
    should = require('should');

describe('SearchServiceController', function () {

    describe('#buildQuery() without days', function () {
        it('should build a where query only on city', function (done) {
            var skip = 0;
            var pageSize = 10;
            var location = "Montpellier";
            var days = null;
            var periods = null;
            var query = sails.services['search'].buildQuery(skip, pageSize, location, days, periods);

            sails.log.debug(JSON.stringify(query));
            query.should.have.property('where');
            query.where["city.address_components"]['$elemMatch'].short_name.should.eql(location);
            should(query.where['schedules']).be.NaN;
            done();
        });
    });

    describe('#buildQuery() with days', function () {
        it('should build a where query only on city', function (done) {
            var skip = 0;
            var pageSize = 10;
            var location = "Montpellier";
            var days = [1.4528124E12, 1.4534172E12, 1.4532444E12];
            var periods = [{"period" : "01-2016"}];
            var query = sails.services['search'].buildQuery(skip, pageSize, location, days, periods);

            sails.log.debug(JSON.stringify(query));
            query.should.have.property('where');
            query.where["city.address_components"]['$elemMatch'].short_name.should.eql(location);
            query.where.schedules['$not']['$elemMatch']['undispos.date']['$in'].should.be.instanceof(Array).and.have.lengthOf(3);
            done();
        });
    });

    /*describe('#search() at Montpellier', function () {
        it('should count profile at Montpellier', function (done) {
            var skip = 0;
            var pageSize = 10;
            var location = "Montpellier";
            var lvl2 = "Hérault";
            var lvl1 = "Languedoc-Roussillon";
            var country = "FR";
            Profile.find({"city.address_components": {
                $elemMatch: {
                    "short_name": "Montpellier"
                }
            }}).exec(function(err, profiles){
                sails.log.debug(profiles);
            });
            sails.services['search'].fullSearch(true, skip, pageSize, location,null, null, null, null, null, function(err, count){
                count.should.be.greaterThan(0);
                done();
            });
        });
    });*/
});