/**
 * Created by alex on 10/11/15.
 */
function sendAccountCreated(user, callback) {

}

function sendContactForm(user, callback) {

}

/* Reservation */

function sendReservationCreated(reservationId) {
    Reservation.findOne({id: reservationId}).populate('student').populate('teacher').exec(function (err, reservation) {
        if (err) {
            sails.log.error(err);
        } else {
            NotificationSettings.findOrCreate({owner: reservation.teacher.owner}, {owner: reservation.teacher.owner}).populate('owner').exec(function (err, settings) {
                if (err) {
                    sails.log.error(err);
                }
                else if (settings.newReservation) {
                    var locale = settings.owner.defaultLocale;

                    var subject = sails.__({
                        phrase: 'mail.resa.created.subject',
                        locale: locale
                    }, {name: reservation.student.firstname});

                    var content = sails.__({
                        phrase: 'mail.resa.created.content',
                        locale: locale
                    }, {
                        name: reservation.student.firstname,
                        link: 'https://toofrench.herokuapp.com/#/planning'
                    });
                    sails.hooks.email.send(
                        'general',
                        {
                            content: content,
                            userName: reservation.teacher.firstname
                        },
                        {
                            to: reservation.teacher.email,
                            subject: subject
                        },
                        function (err) {
                            if (err) {
                                sails.log.error(err);
                            }
                        }
                    )
                }
            });

            NotificationSettings.findOrCreate({owner: reservation.student.owner}, {owner: reservation.student.owner}).populate('owner').exec(function (err, settings) {
                if (err) {
                    sails.log.error(err);
                }
                else if (settings.newReservation) {
                    var locale = settings.owner.defaultLocale;

                    var subject = sails.__({
                        phrase: 'mail.resa.created.student.subject',
                        locale: locale
                    }, {name: reservation.teacher.firstname});

                    var content = sails.__({
                        phrase: 'mail.resa.created.student.content',
                        locale: locale
                    }, {
                        name: reservation.teacher.firstname,
                        link: 'https://toofrench.herokuapp.com/#/planning'
                    });
                    sails.hooks.email.send(
                        'general',
                        {
                            content: content,
                            userName: reservation.student.firstname
                        },
                        {
                            to: reservation.student.email,
                            subject: subject
                        },
                        function (err) {
                            if (err) {
                                sails.log.error(err);
                            }
                        }
                    )
                }
            });
        }
    });

}

function sendReservationValidated(reservationId) {
    Reservation.findOne({id: reservationId}).populate('student').populate('teacher').exec(function (err, reservation) {
        if (err) {
            sails.log.error(err);
        } else {
            NotificationSettings.findOrCreate({owner: reservation.student.owner}, {owner: reservation.student.owner}).populate('owner').exec(function (err, settings) {
                if (err) {
                    sails.log.error(err);
                }
                else if (settings.reservationValidated) {
                    var locale = settings.owner.defaultLocale;

                    var subject = sails.__({
                        phrase: 'mail.resa.validated.subject',
                        locale: locale
                    }, {name: reservation.teacher.firstname});

                    var content = sails.__({
                        phrase: 'mail.resa.validated.content',
                        locale: locale
                    }, {
                        name: reservation.teacher.firstname,
                        link: 'https://toofrench.herokuapp.com/#/planning'
                    });
                    sails.hooks.email.send(
                        'general',
                        {
                            content: content,
                            userName: reservation.student.firstname
                        },
                        {
                            to: reservation.student.email,
                            subject: subject
                        },
                        function (err) {
                            if (err) {
                                sails.log.error(err);
                            }
                        }
                    )
                }
            });

            NotificationSettings.findOrCreate({owner: reservation.teacher.owner}, {owner: reservation.teacher.owner}).populate('owner').exec(function (err, settings) {
                if (err) {
                    sails.log.error(err);
                }
                else if (settings.reservationValidated) {
                    var locale = settings.owner.defaultLocale;

                    var subject = sails.__({
                        phrase: 'mail.resa.validated.student.subject',
                        locale: locale
                    }, {name: reservation.student.firstname});

                    var content = sails.__({
                        phrase: 'mail.resa.validated.student.content',
                        locale: locale
                    }, {
                        name: reservation.student.firstname,
                        link: 'https://toofrench.herokuapp.com/#/planning'
                    });
                    sails.hooks.email.send(
                        'general',
                        {
                            content: content,
                            userName: reservation.teacher.firstname
                        },
                        {
                            to: reservation.teacher.email,
                            subject: subject
                        },
                        function (err) {
                            if (err) {
                                sails.log.error(err);
                            }
                        }
                    )
                }
            });
        }
    });
}

function sendReservationCanceled(reservationId) {
    Reservation.findOne({id: reservationId}).populate('student').populate('teacher').exec(function (err, reservation) {
        if (err) {
            sails.log.error(err);
        } else {
            NotificationSettings.findOrCreate({owner: reservation.student.owner}, {owner: reservation.student.owner}).populate('owner').exec(function (err, settings) {
                if (err) {
                    sails.log.error(err);
                }
                else if (settings.reservationCanceled) {
                    var locale = settings.owner.defaultLocale;

                    var subject = sails.__({
                        phrase: 'mail.resa.canceled.subject',
                        locale: locale
                    }, {name: reservation.teacher.firstname});

                    var content = sails.__({
                        phrase: 'mail.resa.canceled.content',
                        locale: locale
                    }, {
                        name: reservation.teacher.firstname,
                        link: 'https://toofrench.herokuapp.com/#/planning'
                    });
                    sails.hooks.email.send(
                        'general',
                        {
                            content: content,
                            userName: reservation.student.firstname
                        },
                        {
                            to: reservation.student.email,
                            subject: subject
                        },
                        function (err) {
                            if (err) {
                                sails.log.error(err);
                            }
                        }
                    )
                }
            });

            NotificationSettings.findOrCreate({owner: reservation.teacher.owner}, {owner: reservation.teacher.owner}).populate('owner').exec(function (err, settings) {
                if (err) {
                    sails.log.error(err);
                }
                else if (settings.reservationCanceled) {
                    var locale = settings.owner.defaultLocale;

                    var subject = sails.__({
                        phrase: 'mail.resa.canceled.subject',
                        locale: locale
                    }, {name: reservation.student.firstname});

                    var content = sails.__({
                        phrase: 'mail.resa.canceled.content',
                        locale: locale
                    }, {
                        name: reservation.student.firstname,
                        link: 'https://toofrench.herokuapp.com/#/planning'
                    });
                    sails.hooks.email.send(
                        'general',
                        {
                            content: content,
                            userName: reservation.teacher.firstname
                        },
                        {
                            to: reservation.teacher.email,
                            subject: subject
                        },
                        function (err) {
                            if (err) {
                                sails.log.error(err);
                            }
                        }
                    )
                }
            });
        }
    });
}

function sendReservationRefused(reservationId) {
    Reservation.findOne({id: reservationId}).populate('student').populate('teacher').exec(function (err, reservation) {
        if (err) {
            sails.log.error(err);
        } else {
            NotificationSettings.findOrCreate({owner: reservation.student.owner}, {owner: reservation.student.owner}).populate('owner').exec(function (err, settings) {
                if (err) {
                    sails.log.error(err);
                }
                else if (settings.reservationRefused) {
                    var locale = settings.owner.defaultLocale;

                    var subject = sails.__({
                        phrase: 'mail.resa.refused.subject',
                        locale: locale
                    }, {name: reservation.teacher.firstname});

                    var content = sails.__({
                        phrase: 'mail.resa.refused.content',
                        locale: locale
                    }, {
                        name: reservation.teacher.firstname,
                        link: 'https://toofrench.herokuapp.com/#/planning'
                    });
                    sails.hooks.email.send(
                        'general',
                        {
                            content: content,
                            userName: reservation.student.firstname
                        },
                        {
                            to: reservation.student.email,
                            subject: subject
                        },
                        function (err) {
                            if (err) {
                                sails.log.error(err);
                            }
                        }
                    )
                }
            });
        }
    });
}

function sendReviewToAdd(user, reservation) {

}

function sendReviewAdded(user, reservation, review) {

}

/* Message */

function sendMessageReceived(userId, senderId, messageContent) {
    NotificationSettings.findOrCreate({owner: userId}, {owner: userId}).populate('owner').exec(function (err, settings) {
        if (err) {
            sails.log.error(err);
        }
        else if (settings.newMessage) {
            Profile.findOne({owner: userId}).exec(function (err, userP) {
                if (err) {
                    return sails.log.error(err);
                }
                Profile.findOne({owner: senderId}).exec(function (err, senderP) {
                    if (err) {
                        return sails.log.error(err);
                    }
                    var locale = settings.owner.defaultLocale;
                    var subject = sails.__({
                        phrase: 'mail.message.new.subject',
                        locale: locale
                    }, {name: senderP.firstname});
                    sails.hooks.email.send(
                        'message',
                        {
                            userName: userP.firstname,
                            authorName: senderP.firstname,
                            messageContent: messageContent
                        },
                        {
                            to: settings.owner.email,
                            subject: subject
                        },
                        function (err) {
                            if (err) {
                                sails.log.error(err);
                            }
                        }
                    )
                });
            });
        }
    });
}

module.exports = {
    sendAccountCreated: sendAccountCreated,
    sendContactForm: sendContactForm,
    sendMessageReceived: sendMessageReceived,
    sendReservationCreated: sendReservationCreated,
    sendReservationValidated: sendReservationValidated,
    sendReservationCanceled : sendReservationCanceled,
    sendReservationRefused:sendReservationRefused
}