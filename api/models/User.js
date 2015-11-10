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
        },
        /**
         * True if user has already done the bootstrap tour
         */
        tour:{
            type: 'boolean'
        },
        defaultLocale:{
            type: 'string',
            defaultsTo:'fr'
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
            sails.services['mail'].sendMessageReceived(user, 'test', 'test2', messageContent);
        });
    },
    afterCreate: function (user, next) {
        next();
    },
    afterDestroy: function (users, next) {
        if(users.length == 0){
            return next();
        }
        users.forEach(function (user, i) {
            //TODO clean all datas
            sails.log.info('destroy user ' + user.id);
            sails.models.profile.destroy({
                id: user.profile
            }).exec(function (err) {
                if(err){
                    return next(err);
                }
                sails.log.info('destroy profile');
                //Remove user fav list
                UserFavList.destroy({
                    owner: user.id
                }).exec(function (err) {
                    if(err){
                        return next(err);
                    }
                    sails.log.info('destroy fav list');
                    //Remove user conversations
                    sails.models.conversation.destroy({
                        $or: [
                            {owner: user.id},
                            {interlocutor: user.id}
                        ]
                    }).exec(function (err) {
                        if(err){
                            sails.log.info('error destroying convs');
                            return next(err);
                        }
                        sails.log.info('destroy convs');
                        //Remove user diplomas
                        sails.models.diploma.destroy({
                            owner: user.id
                        }).exec(function (err) {
                            if(err){
                                return next(err);
                            }
                            next();
                        });
                    });
                });
            });
        });
    }

};

module.exports = User;