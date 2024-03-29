/**
 * Reservation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


module.exports = {

    attributes: {
        student: {
            model: 'Profile'
        },
        teacher: {
            model: 'Profile'
        },
        formation: {
            model: 'Formation'
        },
        formula: {
            type: 'json'
        },
        date: {
            type: 'date',
            defaultsTo: new Date()
        },
        message: {
            type: 'string'
        },
        hourCount: {
            type: 'json'
        },
        status: {
            type: 'string',
            enum: ['pending', 'validated', 'refused', 'canceled'],
            defaultsTo: 'pending'
        },
        review: {
            model: 'Review'
        },

        isDone: function() {
            return this.status == 'validated' && this.isOver();
        },
        isOver: function() {
            return this.date < new Date();
        }
    },

    afterCreate: function(reservation, next) {
        sails.services['mail'].sendReservationCreated(reservation.id);
        sails.log.info(reservation.teacher);
        User.findOne({ profile: reservation.teacher }).exec(function(err, user) {
            if (err) {
                return;
            }
            if (!user) {
                return;
            }
            sails.services['notification'].createResaNotification(user.id, reservation.id, function(err, notif) {

            });
        });
        next();
    },

    afterDestroy: function(reservations, next) {
        if (reservations.length == 0) {
            return next();
        }
        reservations.forEach(function(reservation, i) {
            //Remove reviews
            sails.log.info('destroy reviews');
            sails.models.review.destroy({
                reservation: reservation.id
            }).exec(function(err) {
                if (err) {
                    return next(err);
                }
                next();
            });
        });
    },

    findBetween: function(from, to, next) {
        if (!(to instanceof Date) || !(from instanceof Date)) {
            return next('Wrong parameters', []);
        }
        if (to < from) {
            return next(null, []);
        }
        var d = new Date();
        Reservation.find({
            'date': {
                '>': from,
                '<' : to
            }
        }).exec(next);
    }
};
