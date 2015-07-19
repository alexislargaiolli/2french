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
		/**
		 * True if the user proposes an accomodation
		 */
		activeAccomodation: 'boolean',
		/**
		 * List of accomodation equipement
 		 */
		equipments: {
			collection: 'Equipment'
		},
		/**
		 * List of accomodation services
		 */
		services: {
			collection: 'Service'
		},
		/**
		 * Google places info of accomodation
		 */
		location: {
			type: 'json'
		},
		/**
		 * Accomodation latitude and longitude
		 */
		accomodationCoords:{
			type : 'json'
		},
		/**
		 * Photos of accomodation
		 */
		photos: {
			type: 'json'
		},
		accomodationDescription:{
			type : 'json'
		},
		schedules: {
			type:'json'
		}
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