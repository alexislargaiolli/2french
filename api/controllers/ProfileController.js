/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    getMonthSchedule: function (req, res) {
        var profileId = req.allParams().profileId;
        var month = req.allParams().month;
        Schedule.findOne({owner: profileId, period: 'month'}).exec(function (err, schedule) {
            if (err) {
                res.sendError("Unable to find schedule");
            }
            else {
                res.send(200, schedule);
            }
        });
    },

    findByCity: function (req, res) {
        var city = req.query['city'];
        var days = req.query['days'];
        if (days && days.length > 0) {
            sails.log.info('search by days');
            days = days.split(',');
            for(i=0;i<days.length;i++){
                days[i] = parseInt(days[i]);
            }
            days = [1.4369976E12];
            sails.log.info(days);

            Profile.find(
                {
                    "city.address_components": {
                        $elemMatch: {
                            long_name: city
                        }
                    },
                    "schedules" : {
                        $elemMatch: {
                            period : "07-2015"
                        }
                    }
                    //'schedules.undispos.css' : 'am'
                }
            )
                .populate('formations')
                .populate('extras')
                .populate('schedules')
                .exec(function (err, profiles) {
                    if (err) {
                        res.send('500', 'error')
                    }
                    /*for(i=0; i< profiles.length;i++){
                        var schedules = profiles[i].schedules;
                        for(j=0; j< schedules.length; j++){
                            var undispos = schedules[j].undispos;
                            for(k=0; k < undispos.length; k++){
                                if(days.con undispos[k])
                            }
                        }
                    }*/
                    res.send(200, profiles);
                });
        }
        else {
            Profile.find(
                {
                    "city.address_components": {
                        $elemMatch: {
                            long_name: city
                        }
                    }
                }
            )
                .populate('formations')
                .populate('extras')
                .exec(function (err, profiles) {
                    if (err) {
                        res.send('500', 'error')
                    }
                    res.send(200, profiles);
                });
        }
    }
};

