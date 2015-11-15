/**
 * ConversationController
 *
 * @description :: Server-side logic for managing conversations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    /**
     *
     * @param req : senderId, recipientId, message
     * @param res
     */
    sendMessage: function (req, res) {
        var senderId = req.allParams().senderId;
        var recipientId = req.allParams().recipientId;
        var messageContent = req.allParams().message;

        //Verify if recipient user exists
        User.findOne({id: recipientId}).exec(function (err, recipient) {
            if (recipient) {

                //Verify if sender user exists
                User.findOne({id: senderId}).exec(function (err, sender) {
                    if (sender) {
                        User.sendMessage(senderId, recipientId, messageContent, function (err, s) {
                            if (err) {
                                res.send(500, 'error while sending message');
                            }
                            else {
                                User.receiveMessage(recipientId, senderId, messageContent, function (err, r) {
                                    if (err) {
                                        res.send(500, 'error while sending recieved message');
                                    }
                                    else {
                                        res.send(200);
                                    }
                                });
                            }
                        });
                    }
                    else {
                        res.send('500', "Sender not found");
                    }
                });
            }
            else {
                res.send('500', "Recipient not found");
            }
        });
    },
    /**
     *
     * @param req: owner
     * @param res: all conversations of a user
     */
    allUserConversations: function (req, res) {
        var userId = req.user.id;
        Conversation.find({owner: userId}).exec(function (err, conversations) {
            if (err) {
                res.send('500', "Error while fetching conversations");
            }
            else {
                sails.services['util'].populateDeep('conversation', conversations, 'interlocutor.profile', function (err, cs) {
                    if (err) {
                        sails.log.error("ERR:", err);
                    }
                    cs.forEach(function(c){
                        c.interlocutorId = c.interlocutor.id;
                        c.interlocutorProfileId = c.interlocutor.profile.id;
                        c.photo = c.interlocutor.profile.photo;
                        c.interlocutor = c.interlocutor.profile.firstname;
                    });
                    res.send(200, cs);
                });
            }
        });
    },
    /**
     *
     * @param req: conversationId
     * @param res: a given conversation with messages populated
     */
    userConversation: function (req, res) {
        var conversationId = req.allParams().conversationId;
        Conversation.findOne({id: conversationId}).populate('messages').exec(function (err, conversation) {
            if (err) {
                res.send(500, "Error while fetching conversation");
            }
            if(!conversation){
                res.send(200);
            }
            else if (conversation.owner != req.user.id) {
                res.forbidden('You are not permitted to perform this action.');
            }
            else {
                sails.services['notification'].removeMessageNotification(req.user.id, conversationId, function(err){
                    if(err){
                        sails.log.error('Error while removing message notification');
                        sails.log.error(err);
                    }
                });
                sails.services['util'].populateDeep('conversation', conversation, 'interlocutor.profile', function (err, c) {
                    if (err) {
                        sails.log.error("ERR:", err);
                    }
                    c.interlocutorId = c.interlocutor.id;
                    c.interlocutor = c.interlocutor.profile.firstname;
                    res.send(200, c);
                });
            }
        });
    },
    setAsRead: function (req, res) {
        var conversationId = req.allParams().conversationId;
        Conversation.findOne({id: conversationId}).exec(function (err, conversation) {
            if (err) {
                res.send(500, "Error while fetching conversation");
            }
            else if (conversation.owner != req.user.id) {
                res.forbidden('You are not permitted to perform this action.');
            }
            else {
                conversation.unseenCount = 0;
                conversation.save(function(err){
                    if(err){
                        res.send(500, "Error while fetching conversation");
                    }
                    else{
                        res.send(200);
                    }
                });
            }
        });
    },
    /**
     *
     * @param req: userId
     * @param res: the count of unseen message in all conversations of a given user
     */
    totalUnseenMessageCount: function (req, res) {
        var userId = req.user.id;
        Conversation.find({owner: userId, count : {'>' : 0}}).exec(function (err, conversations) {
            if (err) {
                res.send(500, "Error while fetching conversations");
            }
            else {
                var count = 0;
                conversations.forEach(function (c) {
                    count += c.unseenCount;
                });
                res.send(200, {unseenCount : count});
            }
        });

    }
};

