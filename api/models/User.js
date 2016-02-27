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
        tour: {
            type: 'boolean',
            defaultsTo: false
        },
        defaultLocale: {
            type: 'string',
            defaultsTo: 'fr'
        },
        resetPasswordToken: {
            type: 'string'
        },
        resetPasswordExpires: {
            type: 'date'
        }
    },
    /**
     * Get all teachers
     * @param validated true to get only validated teacher
     * @param callback
     */
    getTeachers: function (callback) {
        sails.models.user.find({role: ['teacher','admin']}).exec(callback);
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
            sails.services['notification'].createNewMessageNotification(user, conv.id, function (err, notif) {

            });
            sails.services['mail'].sendMessageReceived(user, sender, messageContent);
        });
    },
    afterCreate: function (user, next) {
        sails.log.debug('User.afterCreate() - ' + user.id);
        NotificationSettings.create({owner: user.id}).exec(function () {
        });
        next();
    },
    afterDestroy: function (users, next) {
        if (users.length == 0) {
            return next();
        }
        users.forEach(function (user, i) {
            //TODO clean all datas
            sails.log.debug('User.afterDestroy() - ' + user.id);

            sails.log.debug('User.afterDestroy() - destroying notification settings');
            NotificationSettings.destroy({owner: user.id}).exec(function (err) {
                if (err) {
                    sails.log.error('User.afterDestroy() - error while destroying notification settings');
                }
            });
            sails.log.debug('User.afterDestroy() - destroy profile');
            sails.models.profile.destroy({
                id: user.profile
            }).exec(function (err) {
                if (err) {
                    sails.log.error('User.afterDestroy() - error while destroying user profile');
                    return next(err);
                }

                sails.log.debug('User.afterDestroy() - destroy user favorit list');
                UserFavList.destroy({
                    owner: user.id
                }).exec(function (err) {
                    if (err) {
                        sails.log.error('User.afterDestroy() - error while destroying user favorit list');
                        return next(err);
                    }

                    sails.log.debug('User.afterDestroy() - destroy user conversations');
                    sails.models.conversation.destroy({
                        $or: [
                            {owner: user.id},
                            {interlocutor: user.id}
                        ]
                    }).exec(function (err) {
                        if (err) {
                            sails.log.error('User.afterDestroy() - error while destroying user conversations');
                            return next(err);
                        }

                        sails.log.debug('User.afterDestroy() - destroy diploma');
                        sails.models.diploma.destroy({
                            owner: user.id
                        }).exec(function (err) {
                            if (err) {
                                sails.log.error('User.afterDestroy() - error while destroying diploma');
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