/**
 * Review.js
 *
 * @description :: Review on teacher added by student for a reservation
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        mark: {
            type: 'integer',
            required: true,
            min: 0,
            max: 5
        },

        comment: {
            type: 'string',
            required: true,
            maxLength: 400
        },

        date: {
            type: 'date',
            required: true,
            defaultsTo: new Date()
        },

        teacher: {
            model: 'Profile'
        },

        student: {
            model: 'Profile'
        },

        reservation: {
            model: 'Reservation'
        }
    },

    afterCreate: function (review, cb) {
        Review.find({teacher: review.teacher}).exec(function (err, reviews) {
            if (err) {
                return cb();
            }
            var markTotal = 0;
            for (var i = 0; i < reviews.length; i++) {
                markTotal += reviews[i].mark;
            }
            var sum = markTotal / reviews.length;
            profile.averageMark = sum;
            Profile.update({id: review.teacher}, {averageMark: sum}).exec(function (err, profile) {
                cb();
            });
        });
    }
};

