/**
 * Created by alex on 10/01/16.
 */
var should = require('should');
describe('PostModel', function() {

    describe('#getRecentPost() for only general posts', function() {
        it('should return an array of 2 posts ordered by date', function(done) {
            Post.getRecentPost(3, true, function(err, posts) {
                should.not.exist(err);
                posts.should.be.an.instanceOf(Array);
                posts.should.have.length(2);
                var date;
                posts.should.matchEach(function(post) {
                    if (date) {
                        return date > post.date;
                    }
                    else {
                        date = post.date;
                        return true;
                    }
                });

                done();
            });
        });
    });

    describe('#getRecentPost() for all posts', function() {
        it('should return an array of 3 posts ordered by date', function(done) {
            Post.getRecentPost(3, false, function(err, posts) {
                should.not.exist(err);
                posts.should.be.an.instanceOf(Array);
                posts.should.have.length(3);
                var date;
                posts.should.matchEach(function(post) {
                    if (date) {
                        return date > post.date;
                    }
                    else {
                        date = post.date;
                        return true;
                    }
                });
                done();
            });
        });
    });

    describe('#search()', function() {
        var category;
        before(function(done) {
            PostCategory.findOne(1).exec(function(err, cat) {
                category = cat;
                done();
            });
        });

        it('should return all posts with category 1', function(done) {
            should.exist(category);
            Post.search(null, null, category.id, null, null, null, null, function(err, posts) {
                posts.should.have.length(3);
                done();
            });
        });

        it('should return teacher posts with category 1', function(done) {
            should.exist(category);
            Post.search(null, true, category.id, null, null, null, null, function(err, posts) {
                posts.should.have.length(1);
                done();
            });
        });

        it('should return posts with category 1 and title containing prof', function(done) {
            should.exist(category);
            Post.search("prof", null, category.id, null, null, null, null, function(err, posts) {
                posts.should.have.length(1);
                done();
            });
        });

        it('should return posts counts', function(done) {
            should.exist(category);
            Post.search(null, null, null, null, null, true, null, function(err, count) {
                should.equal(count, 4);
                done();
            });
        });
    });

});