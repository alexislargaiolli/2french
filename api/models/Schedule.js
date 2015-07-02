/**
 * Profile.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    attributes: {
        profile: {
            model: 'profile'
        },
        period:{
            type: 'string'
        },
        daysoff: {
            type: 'array'
        },
        undispos: {
            type: 'json'
        }
    }

};