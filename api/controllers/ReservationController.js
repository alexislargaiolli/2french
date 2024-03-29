/**
 * ReservationController
 *
 * @description :: Server-side logic for managing Reservations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    findOne : function(req, res){
        Reservation.findOne({id : req.allParams().id}).exec(function(err, resa){
            if(err) {
                return serverError(err);
            }  
            if(resa === null || resa === undefined){
                return res.send(200, resa);
            }
            if(req.user.profile == resa.teacher || req.user.profile == resa.student || req.user.role == 'admin'){
                if(req.user.profile == resa.teacher){
                    Profile.findOne({where : {id : resa.student}, select : ['firstname', 'photo', 'city']}).exec(function(err, student){
                        if(err) {
                            return serverError(err);
                        }
                        resa.student = student;
                        res.send(200, resa);
                    });
                }
                else if(req.user.profile == resa.student){
                    Profile.findOne({where : {id : resa.teacher}, select : ['firstname', 'photo', 'city']}).exec(function(err, teacher){
                        if(err) {
                            return serverError(err);
                        }
                        resa.teacher = teacher;
                        res.send(200, resa);
                    });
                }
                else{
                    return res.send(200, resa);
                }
            }
            else{
                return res.forbidden();
            }
        });
    },

    studentResa: function (req, res) {
        var history = req.allParams().history;
        var where = {student: req.user.profile};
        if(history){
            where.date = {$lt: new Date(Date.now() + 3600000)};
        }
        else{
            where.date = {$gt: new Date(Date.now() + 3600000)};
            where.status = { '!' : ['canceled', 'refused']};
        }
        Reservation.find(where).populate('teacher').populate('review').exec(function (err, resas) {
            if (err) {
                return res.serverError("Unable to find resas");
            }
            resas.forEach(function (r) {
                sails.services['notification'].seenResaNotification(req.user.id, r.id,function(err){

                });
                r.teacherId = r.teacher.id;
                r.owner = r.teacher.owner;
                r.photo = r.teacher.photo;
                r.city = r.teacher.city;
                r.teacher = r.teacher.firstname;
            });
            res.send(resas);
        });
    },
    teacherResa: function (req, res) {
        var history = req.allParams().history;
        var where = {teacher: req.user.profile};
        if(history){
            where.date = {$lt: new Date(Date.now() + 3600000)};
        }
        else{
            where.date = {$gt: new Date(Date.now() + 3600000)};
            where.status = { '!' : ['canceled', 'refused']};
        }
        Reservation.find(where).populate('student').populate('review').exec(function (err, resas) {
            if (err) {
                sails.log.error(err);
                return res.send(500,"Unable to find resas");
            }
            resas.forEach(function (r) {
                sails.services['notification'].seenResaNotification(req.user.id, r.id,function(err){

                });
                r.studentId = r.student.id;
                r.owner = r.student.owner;
                r.photo = r.student.photo;
                r.city = r.student.city;
                r.student = r.student.firstname;
            });
            res.send(resas);
        });
    },
    notifCount: function (req, res) {
        var userId = req.user.id;
        Profile.findOne({owner: userId}).exec(function (err, profile) {
            var where = {$or: [{teacher: profile.id}, {student: profile.id}]};
            where.date = {$gt: new Date(Date.now() + 3600000)};
            if(req.user.role == 'student'){
                where.status= ['validated', 'refused'];
            }
            else{
                where.status= 'pending';
            }
            Reservation.count({
                $or: [{teacher: profile.id}, {student: profile.id}],
                status: 'pending',
                date: {$gt: new Date(Date.now() + 3600000)}
            }).exec(function (err, count) {
                if (err) {
                    return res.serverError("Unable to find resas");
                }
                res.send({count: count});
            });
        });
    },
    teacherChangeStatus: function (req, res) {
        var userId = req.user.id;
        var resaId = req.allParams().resaId;
        var status = req.allParams().status;
        Profile.findOne({owner: userId}).exec(function (err, profile) {
            if (err) {
                return res.serverError("Unable to find profile");
            }
            Reservation.findOne({id: resaId, teacher: profile.id}).exec(function (err, resa) {
                if (err) {
                    return res.serverError("Unable to find resas");
                }
                if (!resa) {
                    return res.send('not found');
                }
                if (['pending', 'validated', 'refused', 'canceled'].indexOf(status) == -1) {
                    return res.send(500);
                }

                //Send notif by mail
                if(resa.status != "validated" && status == "validated"){
                    sails.services['mail'].sendReservationValidated(resa.id);
                }
                if(resa.status != "refused" && status == "refused"){
                    sails.services['mail'].sendReservationRefused(resa.id);
                }
                //Create notification
                User.findOne({profile :resa.student}).exec(function (err, u) {
                    if(err){
                        return;
                    }
                    if(!u){
                        return;
                    }
                    sails.services['notification'].createResaNotification(u.id, resa.id, function(err,notif){

                    });
                });
                Reservation.update({id: resaId}, {status: status}).exec(function (err, r) {
                    if (err) {
                        return res.serverError("Unable to update status");
                    }

                    res.send(200, r);
                });
            });
        });
    },
    cancelReservation: function (req, res) {
        var userId = req.user.id;
        var resaId = req.allParams().resaId;
        Profile.findOne({owner: userId}).exec(function (err, profile) {
            if (err) {
                return res.serverError("Unable to find profile");
            }
            Reservation.findOne({
                id: resaId,
                $or: [{teacher: profile.id}, {student: profile.id}]
            }).exec(function (err, resa) {
                if (err) {
                    return res.serverError("Unable to find resas");
                }
                if (!resa) {
                    return res.send('not found');
                }
                sails.services['mail'].sendReservationCanceled(resa.id);

                var userToNotify;
                if(resa.student == profile.id){
                    userToNotify = resa.teacher;
                }
                else{
                    userToNotify = resa.student;
                }
                //Create notification
                User.findOne({profile :userToNotify}).exec(function (err, user) {
                    if(err){
                        return;
                    }
                    if(!user){
                        return;
                    }
                    sails.services['notification'].createResaNotification(user.id, resa.id, function(err,notif){

                    });
                });
                Reservation.update({id: resaId}, {status: 'canceled'}).exec(function (err, r) {
                    if (err) {
                        return res.serverError("Unable to update status");
                    }
                    res.send(200, r);
                });
            });
        });
    },

    addReview: function (req, res) {
        var resaId = req.allParams().resaId;
        var mark = req.allParams().mark;
        var comment = req.allParams().comment;

        Reservation.findOne({
            id: resaId,
            student: req.user.profile
        }).exec(function (err, resa) {
            if (err) {
                return res.serverError("Unable to find resas");
            }
            if (!resa) {
                return res.notFound('not found');
            }
            sails.log.info(resa.date);
            if(resa.date > new Date()){
                return res.forbidden("Unable to add review on a futur reservation");
            }
            Review.create({mark : mark, comment : comment, teacher : resa.teacher, student : resa.student, reservation : resa}).exec(function(err, review){
                if(err){
                    return res.serverError(err);
                }
                resa.review = review;
                resa.save(function(err){
                    if(err){
                        return res.serverError(err);
                    }
                    res.send(200, review);
                });
            });
        });

    }
};

