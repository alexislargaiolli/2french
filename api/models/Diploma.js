/**
 * Diploma.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        owner: {
            model: 'User'
        },
        fileName: 'string',
        diplomaUploaded: {
            type: 'boolean',
            defaultsTo: false
        },
        diplomaValidated: {
            type: 'boolean',
            defaultsTo: false
        }
    },
    /**
     * Find diploma of a given user
     * @param userId a given user id
     * @param cb
     */
    getByUser : function(userId, cb){
        Diploma.findOne({owner : userId}).exec(cb);
    },
    /**
     * Check if a diploma is validated (ie: exists, uploaded and validated)
     * @param diploma diploma to check (object or id)
     * @param cb callback method to call cb(validated)
     */
    isValidated: function (diploma, cb) {
        sails.log.debug("Diploma.isValidated() " + diploma);

        (function _lookupProfileIfNecessary(afterLookup) {
            // (this self-calling function is just for concise-ness)
            if (typeof diploma === 'object')
                return afterLookup(null, diploma);
            Diploma.findOne(diploma).exec(afterLookup);
        })
        (function (err, diploma) {
            if (err || !diploma) {
                return cb(false);
            }
            if(diploma.diplomaUploaded && diploma.diplomaValidated){
                return cb(true);
            }
            return cb(false);
        });
    },
    /**
     * Check if a diploma of a given user is validated (ie: exists, uploaded and validated)
     * @param userId the user id
     * @param cb
     */
    isValidatedByUser:function(userId, cb){
        Diploma.getByUser(userId, function(err, diploma){
            if(err || !diploma){
                return cb(false);
            }
            Diploma.isValidated(diploma, cb);
        });
    },
    /**
     * Set a diploma as validated
     * @param diploma diploma to validate (object or id)
     * @param cb callback method to call
     */
    validateDiploma: function (diploma, cb) {
        sails.log.debug("Diploma.validateDiploma() " + diploma);
        (function _lookupProfileIfNecessary(afterLookup) {
            // (this self-calling function is just for concise-ness)
            if (typeof diploma === 'object')
                return afterLookup(null, diploma);
            Diploma.findOne(diploma).exec(afterLookup);
        })
        (function (err, diploma) {
            if (err || !diploma) {
                return cb(err, diploma);
            }
            diploma.diplomaValidated = true;
            diploma.save(cb);
        });
    },
    /**
     * Process when admin validates a diploma.
     * Validate a diploma and send a confirmation email
     * @param diploma diploma to validate (object or id)
     * @param cb callback method to call: cb(err, diploma)
     */
    actionValidate:function(diploma, cb){
        Diploma.validateDiploma(diploma, function(err, diploma){
            if(err || !diploma){
                return cb(err, diploma);
            }
            sails.services['mail'].sendDiplomaValidated(diploma.owner);
            cb(null, diploma);
        });
    }

};