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
        },
        conversations: {
            collection: 'conversation',
            via: 'owner'
        }
    },
    sendMessage: function (user, recipient, messageContent, callback) {

        Conversation.findOrCreate({owner: user, interlocutor: recipient}, {
            owner: user,
            interlocutor: recipient
        }, function (err, conv) {
            if (!conv.messages) {
                conv.messages = [];
            }
            conv.messages.add({author: user, recipient: recipient, content: messageContent, conversation: conv});
            conv.save(callback);
        });

    },
    receiveMessage: function (user, sender, messageContent, callback) {
        Conversation.findOrCreate({owner: user, interlocutor: sender}, {
            owner: user,
            interlocutor: sender
        }, function (err, conv) {
            if (!conv.messages) {
                conv.messages = [];
            }
            conv.unseenCount++;
            conv.messages.add({author: sender, recipient: user, content: messageContent, conversation: conv});
            conv.save(callback);
        });
    },
    afterCreate: function (user, next) {
        next();
    },
    afterDestroy: function (users, next) {
        users.forEach(function (user, i) {
            //TODO clean all datas
            sails.models.profile.destroy({
                id: user.profile
            }).exec(function (err) {
                next();
            });
        });
    }

};

module.exports = User;