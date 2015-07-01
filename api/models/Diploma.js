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
		fileName:'string',
		diplomaUploaded :{
			type:'boolean',
			defaultsTo: false
		},
		diplomaValidated :{
			type:'boolean',
			defaultsTo: false
		}
	}
};