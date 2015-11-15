/**
 * NotificationController
 *
 * @description :: Server-side logic for managing Notifications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	unseen: function(req, res){
        var where = {owner : req.user.id, seen : false};
        var type = req.allParams().type;
        if(type){
            where.type = type;
        }
        Notification.find(where).exec(function(err, notifs){
            if(err){
                sails.log.error(err);
                return res.send(500, 'An error occured while retriving notifications');
            }
            return res.send(200, notifs);
        });
    },
    all: function(req, res){
        Notification.find({owner : req.user.id}).exec(function(err, notifs){
            if(err){
                sails.log.error(err);
                return res.send(500, 'An error occured while retriving notifications');
            }
            return res.send(200, notifs);
        });
    }
};

