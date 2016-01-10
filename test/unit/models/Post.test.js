/**
 * Created by alex on 10/01/16.
 */
var should = require('should');
describe('PostModel', function () {

    describe('#getRecentPost() for only general posts', function () {
        it('should return an array of 2 posts ordered by date', function (done) {
            Post.getRecentPost(3, true, function (err, posts) {
                should.not.exist(err);
                posts.should.be.an.instanceOf(Array);
                posts.should.have.length(2);
                var date;
                posts.should.matchEach(function (post) {
                    if(date){
                        return date > post.date;
                    }
                    else{
                        date = post.date;
                        return true;
                    }
                });

                done();
            });
        });
    });

    describe('#getRecentPost() for all posts', function () {
        it('should return an array of 3 posts ordered by date', function (done) {
            Post.getRecentPost(3, false, function (err, posts) {
                should.not.exist(err);
                posts.should.be.an.instanceOf(Array);
                posts.should.have.length(3);
                var date;
                posts.should.matchEach(function (post) {
                    if(date){
                        return date > post.date;
                    }
                    else{
                        date = post.date;
                        return true;
                    }
                });
                done();
            });
        });
    });

});