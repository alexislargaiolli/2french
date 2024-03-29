/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var POST_FILE_COLUMN_NAME = "post_files";
module.exports = {

    attributes: {
        date: {
            type: 'date',
            defaultsTo: new Date()
        },
        teacher: {
            type: 'boolean',
            defaultsTo: false
        },
        category: {
            model: 'PostCategory'
        },
        author: {
            model: 'Profile'
        },
        title: 'string',
        content: 'string',
        locale: {
            model: 'Locale'
        },
        files: 'array',
        seenCount: {
            type: 'integer',
            defaultsTo: 0
        },
        likeCount: {
            type: 'integer',
            defaultsTo: 0
        },
        downloadCount: {
            type: 'integer',
            defaultsTo: 0
        },
        comments: {
            collection: 'Comment',
            via: 'post'
        }
    },
    afterCreate: function(post, next) {
        if (post.teacher) {
            sails.services['notification'].createForumNotificationToAllTeacher(post.id, function() {

            });
        }
        next();
    },
    search: function(title, teacher, category, pageSize, pageIndex, count, sort, callback) {
        var size = 10;
        var index = 1;
        var method = 'find';
        if(count){
            method = 'count';
        }
        if (pageSize) {
            size = pageSize;
        }
        if (pageIndex) {
            index = pageIndex;
        }
        var skip = size * (index - 1);
        var where = {};
        if (category) {
            where.category = category;
        }
        if (teacher) {
            where.teacher = teacher;
        }
        if(title){
            where.title = {'contains' : title};
        }
        sails.log.debug('search [title : ' + title + ', teacher : ' + teacher + ', category : ' + category +', method : '+ method + ', pageSize : '+size+', pageIndex : '+index+', skip : '+skip+']');
        Post[method]({
            where: where,
            skip: skip,
            limit: size,
            sort: sort
        }).exec(callback);
    },
    /**
     * Find the more recent posts
     * @param numberToLoad number of post to load
     * @param onlyGeneralPost true to find only genral post, false to find general and teacher posts
     * @param cb callback method
     */
    getRecentPost: function(numberToLoad, onlyGeneralPost, cb) {
        sails.log.debug('getRecentPost() - [numberToLoad : ' + numberToLoad + ', onlyGeneralPost : ' + onlyGeneralPost + ']');
        var where = {};
        if (onlyGeneralPost == true) {
            where.teacher = false;
        }
        Post.find({
            where: where,
            limit: numberToLoad,
            sort: 'date DESC'
        }).populate('category').exec(function(err, posts) {
            if (err) {
                return cb(err, []);
            }
            cb(null, posts);
        });
    },
    afterDestroy: function(posts, next) {
        sails.log.info('destroy post');
        if (posts.length == 0) {
            return next();
        }
        var env = process.env.NODE_ENV;
        var conf = null;
        if (env == "development") {
            conf = sails.config.connections.mongo;
        }
        else if (env == "production") {
            conf = sails.config.connections.mongoProd;
        }
        posts.forEach(function(post, i) {
            sails.log.info('destroy comments');
            //Remove comments
            sails.models.comment.destroy({
                post: post.id
            }).exec(function(err) {
                if (err) {
                    sails.log.info('error removing comments');
                    return next(err);
                }
                sails.log.info('comments destroyed');
                next();
            });

            if (conf) {
                if (post.files) {
                    sails.log.info('destroy files');
                    var url = "mongodb://" + conf.user + ":" + conf.password + "@" + conf.host + ":" + conf.port + "/" + conf.database + "." + POST_FILE_COLUMN_NAME

                    var blobAdapter = require('skipper-gridfs')({
                        uri: url
                    });

                    post.files.forEach(function(file, index) {
                        if (file.fd) {
                            blobAdapter.rm(file.fd, function(error, file) {
                                if (error) {
                                    sails.log.error('error while removing post file ' + file.fd);
                                }
                            });
                        }
                    });
                }
            }
        });
    }
};
