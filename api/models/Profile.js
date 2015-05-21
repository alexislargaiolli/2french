/**
 * Profile.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
	attributes: {
		owner: {
			model: 'User'
		},
		firstname: {
			type: 'string'
		},
		photo: {
			type: 'string'
		},
		motivation: {
			type: 'json'
		},
		levelFrom: {
			model: 'FormationLevel'
		},
		levelTo: {
			model: 'FormationLevel'
		},
		hourRate: {
			type: 'integer'
		},
		formations: {
			collection: 'Formation'
		},
		extras: {
			collection: 'Extra'
		},
		formulas: {
			type: 'json'
		},
		city: {
			type: 'json'
		},
		activeAccomodation: 'boolean',
		equipments: {
			collection: 'Equipment'
		},
		services: {
			collection: 'Service'
		},
		location: {
			type: 'json'
		},
		photos: {
			type: 'json'
		},
		daySelected: {
			type: 'json'
		},
		diplomaUploaded : 'boolean',
		diplomaValidated : 'boolean'
	},
	beforeCreate: function(values, next) {
		/*values.accommodation = {};
		values.accommodation.equipments = new Array();
		values.accommodation.services = new Array();
		values.activeAccomodation = false;*/
		next();
	},
	afterCreate: function(profile, next) {
		sails.log.info(profile);
		next();
	}

};