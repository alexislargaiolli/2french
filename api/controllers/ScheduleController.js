/**
 * ScheduleController
 *
 * @description :: Server-side logic for managing Schedules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    getMonthSchedule: function(req, res){
        var profileId = req.allParams().profileId;
        var period = req.allParams().period;
        Schedule.findOne({profile : profileId, period : period}).exec(function(err, schedule){
            if(err){
                res.serverError("Unable to find schedule");
            }
            else{
                res.send(200, schedule);
            }
        });
    }
};

