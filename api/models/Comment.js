/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        post: {
            model: 'Post'
        },
        date: {
            type: 'date',
            defaultsTo: new Date()
        },
        author: {
            model: 'Profile'
        },
        content: 'string'
    },

    afterCreate: function (commentCreated, next) {
        Comment.find({post : commentCreated.post}).populate('author').exec(function(err, comments){
            var usersNotified = [];
            comments.forEach(function (comment, index) {
                if(comment.author.id != commentCreated.author && usersNotified.indexOf(comment.author.id) == -1){
                    sails.services['notification'].createForumNotification(comment.author.owner, commentCreated.post, function (err, notif) {

                    });
                    usersNotified.push(comment.author.id);
                }
            });
        });
        next();
    }
};

