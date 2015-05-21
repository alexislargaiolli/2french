var User = {
	// Enforce model schema in the case of schemaless databases
	schema: true,

	attributes: {
		username: {
			type: 'string',
			unique: true
		},
		email: {
			type: 'email',
			unique: true
		},
		passports: {
			collection: 'Passport',
			via: 'user'
		},
		role: {
			type: 'string',
			enum: ['admin', 'teacher', 'student']
		},
		profile: {
			model: 'Profile'
		}		
	},

	afterCreate: function(user, next) {
		/*sails.models.profile.create({
			"owner": user.id
		}).exec(function(err, profile) {
			sails.models.user.update({
				"email": user.email
			}, {
				"profile": profile.id
			}).exec(function(err, u) {
				next();
			});

		});*/
		next();
	},
	afterDestroy: function(users, next) {
		users.forEach(function(user, i) {
			sails.models.profile.destroy({
				id: user.profile
			}).exec(function(err) {
				next();
			});
		});
	}

};

module.exports = User;