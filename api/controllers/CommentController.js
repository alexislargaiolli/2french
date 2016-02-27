/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    find: function (req, res) {
        var id = req.allParams().id;
        Comment.findOne({
            where: {id: id}
        }).populate('author').exec(function (err, comment) {
            if (err) {
                return res.serverError("Unable to find posts");
            }
            comment.authorId = comment.author.id;
            comment.photo = comment.author.photo;
            comment.author = comment.author.firstname;
            res.send(comments);
        });
    },
    postComments: function (req, res) {
        var count = req.allParams().count;
        var postId = req.allParams().postId;
        var pageSize = req.allParams().pageSize;
        var pageIndex = req.allParams().pageIndex;
        if (!postId) {
            return res.serverError("Missing params");
        }
        if (count && count == 1) {
            Comment.count({
                where: {post: postId},
                sort: 'date ASC'
            }).exec(function (err, count) {
                if (err) {
                    return res.serverError("Unable to find posts");
                }
                res.send(200, {count: count});
            });
        }
        else {
            if (!pageSize) {
                pageSize = 10;
            }
            if (!pageIndex) {
                pageIndex = 1;
            }
            var skip = pageSize * (pageIndex - 1);
            Comment.find({
                where: {post: postId},
                skip: skip,
                limit: pageSize,
                sort: 'date ASC'
            }).populate('author').exec(function (err, comments) {
                if (err) {
                    return res.serverError("Unable to find posts");
                }
                comments.forEach(function (c) {
                    c.authorId = c.author.id;
                    c.photo = c.author.photo;
                    c.author = c.author.firstname;
                });
                res.send(comments);
            });
        }
    }
};

