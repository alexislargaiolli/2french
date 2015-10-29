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
        formula: {
            type: 'json'
        },
        date: {
            type: 'date',
            required : true
        },
        message: {
            type: 'string'
        },
        hourCount:{
            type:'json'
        },
        status: {
            type: 'string',
            enum: ['pending', 'validated', 'refused', 'canceled'],
            defaultsTo : 'pending'
        },
        review:{
            model: 'Review'
        },

        isDone : function(){
            return this.status == 'validated' && this.date < new Date();
        }
    },

    afterDestroy: function (reservations, next) {
        if (reservations.length == 0) {
            return next();
        }
        reservations.forEach(function (reservation, i) {
            //Remove reviews
            sails.log.info('destroy reviews');
            sails.models.review.destroy({
                reservation: reservation.id
            }).exec(function (err) {
                if (err) {
                    return next(err);
                }
                next();
            });
        });
    }
};

