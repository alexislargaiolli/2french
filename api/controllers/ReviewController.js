/**
 * ReviewController
 *
 * @description :: Server-side logic for managing Reviews
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    teacherReviews: function (req, res) {
        Review.find({
            where: {teacher: req.allParams().teacherId},
            select: ['mark', 'comment', 'student']
        }).exec(function (err, reviews) {
            if(err){
                return res.serverError(err);
            }
            if(reviews.length == 0){
                return res.send(reviews);
            }
            reviews.forEach(function (review, index) {
                Profile.findOne({where: {id: review.student}, select: ['id', 'firstname', 'photo']}).exec(function (err, student) {
                    if(err){
                        return res.serverError(err);
                    }
                    reviews[index].student = student;
                    if (index >= reviews.length - 1) {
                        res.send(reviews);
                    }
                });
            });
        });
    }
};

