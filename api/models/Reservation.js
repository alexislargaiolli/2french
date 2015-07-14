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
            type: 'date'
        },
        message: {
            type: 'string'
        },
        hourCount:{
            type:'json'
        },
        status: {
            type: 'string',
            enum: ['pending', 'validated', 'refused', 'canceled']
        }
    }
};

