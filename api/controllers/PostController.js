/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var POST_FILE_COLUMN_NAME = "post_files";
module.exports = {
    findOne: function(req, res) {
        var id = req.allParams().id;
        Post.findOne({
            id: id
        }).populate('category').populate('author').populate('comments').exec(function(err, post) {
            if (err) {
                sails.log.error(err);
                return res.send(500, "Unable to find post");
            }
            else {
                if (!post) {
                    return res.send(500, "Unable to find post");
                }
                if (post.comments && post.comments.length > 0) {
                    sails.services['util'].populateDeep('post', post, 'comments.author', function(e, p) {
                        if (e) {
                            return res.serverError("Error while fetching comments");
                        }
                        else {
                            if (p.comments) {
                                p.comments.forEach(function(c) {
                                    c.authorId = c.author.id;
                                    c.photo = c.author.photo;
                                    c.author = c.author.firstname;
                                });
                            }
                            res.send(200, p);
                        }
                    });
                }
                else {
                    res.send(200, post);
                }
                var count = post.seenCount + 1;
                Post.update({
                    id: id
                }, {
                    seenCount: count
                }).exec(function(err, p) {

                });
            }
        });
    },
    teacherPosts: function(req, res) {
        Post.find({
            teacher: true
        }).populate('category').exec(function(err, posts) {
            if (err) {
                res.serverError("Unable to find posts");
            }
            else {
                res.send(posts);
            }
        });
    },
    generalPosts: function(req, res) {
        Post.find({
            teacher: false
        }).populate('category').exec(function(err, posts) {
            if (err) {
                res.serverError("Unable to find posts");
            }
            else {
                res.send(posts);
            }
        });
    },
    recentPosts: function(req, res) {
        var onlyGeneralPost = true;
        if (req.user && (req.user.role == 'admin' || req.user.role == 'teacher')) {
            onlyGeneralPost = false;
        }
        Post.getRecentPost(3, onlyGeneralPost, function(err, posts) {
            if (err) {
                return res.serverError("Unable to find posts");
            }
            res.send(posts);
        });
    },
    popularPosts: function(req, res) {
        var teacher = req.user && (req.user.role == 'admin' || req.user.role == 'teacher');
        var where = {};
        if (!teacher) {
            where.teacher = false;
        }
        Post.find({
            where: where,
            limit: 3,
            sort: 'seenCount ASC'
        }).populate('category').exec(function(err, posts) {
            if (err) {
                res.serverError("Unable to find posts");
            }
            else {
                res.send(posts);
            }
        });
    },
    popularFilePosts: function(req, res) {
        var teacher = req.user && (req.user.role == 'admin' || req.user.role == 'teacher');
        var where = {};
        if (!teacher) {
            where.teacher = false;
        }
        where.files = {
            $exists: true,
            $not: {
                $size: 0
            }
        };
        Post.find({
            where: where,
            limit: 3,
            sort: 'downloadCount ASC'
        }).populate('category').exec(function(err, posts) {
            if (err) {
                res.serverError("Unable to find posts");
            }
            else {
                res.send(posts);
            }
        });
    },
    postTeacherByCategory: function(req, res) {
        var count = req.allParams().count;
        var category = req.allParams().categoryId;
        var pageSize = req.allParams().pageSize;
        var pageIndex = req.allParams().pageIndex;
        var title = req.allParams().title;
        if (!category) {
            return res.serverError("Missing params");
        }
        
        Post.search(title, true, category, pageSize, pageIndex, count, 'seenCount ASC', function(err, posts) {
            if (err) {
                return res.serverError("Unable to find posts");
            }
            var result = posts;
            if (count) {
                result = {
                    count: posts
                };
            }
            res.send(200, result);
        });
        // if (count && count == 1) {
        //     Post.count({
        //         where: {teacher: true, category: category},
        //         sort: 'seenCount ASC'
        //     }).exec(function (err, count) {
        //         if (err) {
        //             return res.serverError("Unable to find posts");
        //         }
        //         res.send(200, {count: count});
        //     });
        // }
        // else {
        //     if (!pageSize) {
        //         pageSize = 10;
        //     }
        //     if (!pageIndex) {
        //         pageIndex = 1;
        //     }
        //     var skip = pageSize * (pageIndex - 1);
        //     Post.find({
        //         where: {teacher: true, category: category},
        //         skip: skip,
        //         limit: pageSize,
        //         sort: 'seenCount ASC'
        //     }).exec(function (err, posts) {
        //         if (err) {
        //             return res.serverError("Unable to find posts");
        //         }
        //         res.send(posts);
        //     });
        // }
    },
    postGeneralByCategory: function(req, res) {
        var count = req.allParams().count;
        var category = req.allParams().categoryId;
        var pageSize = req.allParams().pageSize;
        var pageIndex = req.allParams().pageIndex;
        var title = req.allParams().title;
        if (!category) {
            return res.serverError("Missing params");
        }
        Post.search(title, false, category, pageSize, pageIndex, count, 'seenCount ASC', function(err, posts) {
            if (err) {
                return res.serverError("Unable to find posts");
            }
            var result = posts;
            if (count) {
                result = {
                    count: posts
                };
            }
            res.send(200, result);
        });
        // if (count && count == 1) {
        //     Post.count({
        //         where: {
        //             teacher: false,
        //             category: category
        //         },
        //         sort: 'seenCount ASC'
        //     }).exec(function(err, count) {
        //         if (err) {
        //             return res.serverError("Unable to find posts");
        //         }
        //         res.send(200, {
        //             count: count
        //         });
        //     });
        // }
        // else {
        //     if (!pageSize) {
        //         pageSize = 10;
        //     }
        //     if (!pageIndex) {
        //         pageIndex = 1;
        //     }
        //     var skip = pageSize * (pageIndex - 1);
        //     Post.find({
        //         where: {
        //             teacher: false,
        //             category: category
        //         },
        //         skip: skip,
        //         limit: pageSize,
        //         sort: 'seenCount ASC'
        //     }).exec(function(err, posts) {
        //         if (err) {
        //             return res.serverError("Unable to find posts");
        //         }
        //         res.send(posts);
        //     });
        // }
    },
    uploadFile: function(req, res) {
        var env = process.env.NODE_ENV;
        var conf = null;
        if (env == "development") {
            conf = sails.config.connections.mongo;
        }
        else if (env == "production") {
            conf = sails.config.connections.mongoProd;
        }
        if (conf) {
            var url = "mongodb://" + conf.user + ":" + conf.password + "@" + conf.host + ":" + conf.port + "/" + conf.database + "." + POST_FILE_COLUMN_NAME;
            sails.log.info(url);
            req.file('file')
                .upload({
                    adapter: require('skipper-gridfs'),
                    uri: url
                }, function whenDone(err, uploadedFiles) {
                    if (err) {
                        res.send(500, "Error while writing file");
                    }
                    else {
                        var fileName = uploadedFiles[0].filename;
                        var fd = uploadedFiles[0].fd
                        res.send(200, {
                            name: fileName,
                            fd: fd
                        });
                    }
                });
        }
        else {
            res.send(500, "Unknown environnement");
        }
    },
    downloadFile: function(req, res) {
        var postId = req.allParams().postId;
        var fd = req.allParams().fd;
        if (!fd || !postId) {
            res.send(500, "Missing params");
        }
        else {
            var env = process.env.NODE_ENV;
            var conf = null;
            if (env == "development") {
                conf = sails.config.connections.mongo;
            }
            else if (env == "production") {
                conf = sails.config.connections.mongoProd;
            }
            if (conf) {
                var url = "mongodb://" + conf.user + ":" + conf.password + "@" + conf.host + ":" + conf.port + "/" + conf.database + "." + POST_FILE_COLUMN_NAME

                var blobAdapter = require('skipper-gridfs')({
                    uri: url
                });

                blobAdapter.read(fd, function(error, file) {
                    if (error) {
                        res.json(error);
                    }
                    else {
                        res.contentType('application/pdf');
                        res.send(new Buffer(file));
                    }
                });

                Post.findOne({
                    id: postId
                }).exec(function(err, post) {
                    if (err) {
                        sails.log.error('Enable to increment download count');
                    }
                    else {
                        var count = post.downloadCount + 1;
                        Post.update({
                            id: postId
                        }, {
                            downloadCount: count
                        }).exec(function(err, p) {

                        });
                    }
                });
            }
            else {
                res.send(500, "Unknown environnement");
            }
        }
    }

};
