/**
 * NotificationController
 *
 * @description :: Server-side logic for managing Notifications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    unseen: function (req, res) {
        var where = {owner: req.user.id, seen: false};
        var type = req.allParams().type;
        var skip = 0;
        var limit = 10;
        if (type) {
            where.type = type;
        }
        Notification.find(where).skip(skip).limit(limit).populate('conversation').populate('reservation').sort('date ASC').exec(function (err, notifs) {
            if (err) {
                sails.log.error(err);
                return res.send(500, 'An error occured while retriving notifications');
            }
            if (notifs.length == 0) {
                return res.send(200, notifs);
            }
            async.each(notifs, function (notif, callback) {
                if(notif.type == 'message'){
                    Notification.processConversation(notif, function (err, n) {
                        callback();
                    });
                }
                else if(notif.type == 'resa'){
                    Notification.processReservation(notif, function(){
                        callback();
                    });
                }
                else if(notif.type == 'forum'){
                    callback();
                }
                else{
                    callback();
                }
            }, function (err) {
                if (err) {

                }
                return res.send(200, notifs);
            });
        });
    },
    unseenCount : function(req, res){
        Notification.count({owner: req.user.id, seen: false}).exec(function(err, count){
            if(err){
                return res.send(200, {count : 0});
            }
            res.send(200, {count : count});
        });
    }
};

