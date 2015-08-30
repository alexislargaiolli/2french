/**
 * ReservationController
 *
 * @description :: Server-side logic for managing Reservations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    studentResa: function (req, res) {
        var userId = req.user.id;
        Profile.findOne({owner: userId}).exec(function (err, profile) {
            Reservation.find({student: profile.id}).populate('teacher').exec(function (err, resas) {
                if (err) {
                    return res.sendError("Unable to find resas");
                }
                resas.forEach(function (r) {
                    r.teacherId = r.teacher.id;
                    r.owner = r.teacher.owner;
                    r.photo = r.teacher.photo;
                    r.city = r.teacher.city;
                    r.student = r.teacher.firstname;
                });
                res.send(resas);
            });
        });
    },
    teacherResa: function (req, res) {
        var userId = req.user.id;
        Profile.findOne({owner: userId}).exec(function (err, profile) {
            Reservation.find({teacher: profile.id}).populate('student').exec(function (err, resas) {
                if (err) {
                    return res.sendError("Unable to find resas");
                }
                resas.forEach(function (r) {
                    r.studentId = r.student.id;
                    r.owner = r.student.owner;
                    r.photo = r.student.photo;
                    r.city = r.student.city;
                    r.student = r.student.firstname;
                });
                res.send(resas);
            });
        });
    },
    newTeacherResaCount: function (req, res) {
        var userId = req.user.id;
        Profile.findOne({owner: userId}).exec(function (err, profile) {
            Reservation.count({teacher: profile.id, status: 'pending'}).exec(function (err, count) {
                if (err) {
                    return res.sendError("Unable to find resas");
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
                return res.sendError("Unable to find profile");
            }
            Reservation.findOne({id: resaId, teacher: profile.id}).exec(function (err, resa) {
                if (err) {
                    return res.sendError("Unable to find resas");
                }
                if (!resa) {
                    return res.send('not found');
                }
                if (['pending', 'validated', 'refused', 'canceled'].indexOf(status) == -1) {
                    return res.send(500);
                }
                Reservation.update({id: resaId}, {status: status}).exec(function (err, r) {
                    if (err) {
                        return res.sendError("Unable to update status");
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
                return res.sendError("Unable to find profile");
            }
            Reservation.findOne({
                id: resaId,
                $or: [{teacher: profile.id}, {student: profile.id}]
            }).exec(function (err, resa) {
                if (err) {
                    return res.sendError("Unable to find resas");
                }
                if (!resa) {
                    return res.send('not found');
                }
                Reservation.update({id: resaId}, {status: 'canceled'}).exec(function (err, r) {
                    if (err) {
                        return res.sendError("Unable to update status");
                    }
                    res.send(200, r);
                });
            });
        });
    }
};

