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

function sendProfileValidated(userId) {
    NotificationSettings.findOrCreate({owner: userId}, {owner: userId}).populate('owner').exec(function (err, settings) {
        Profile.findOne({'owner': userId}).exec(function (err, profile) {
            if (err) {
                sails.log.error(err);
            }
            else {
                if (profile) {
                    var locale = settings.owner.defaultLocale;

                    var subject = sails.__({
                        phrase: 'mail.profile.validated.subject',
                        locale: locale
                    });

                    var content = sails.__({
                        phrase: 'mail.profile.validated.content',
                        locale: locale
                    });
                    sails.hooks.email.send(
                        'general',
                        {
                            content: content,
                            userName: profile.firstname
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
                }
            }
        });
    });
}

function sendDiplomaValidated(userId) {
    NotificationSettings.findOrCreate({owner: userId}, {owner: userId}).populate('owner').exec(function (err, settings) {
        Profile.findOne({'owner': userId}).exec(function (err, profile) {
            if (err) {
                sails.log.error(err);
            }
            else {
                if (profile) {
                    var locale = settings.owner.defaultLocale;

                    var subject = sails.__({
                        phrase: 'mail.diploma.validated.subject',
                        locale: locale
                    });

                    var content = sails.__({
                        phrase: 'mail.diploma.validated.content',
                        locale: locale
                    });
                    sails.hooks.email.send(
                        'general',
                        {
                            content: content,
                            userName: profile.firstname
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
                }
            }
        });
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

function forgottenPassword(token, email, next) {

    User.findOne({email: email}).exec(function (err, user) {
        if (err) {
            sails.log.error(err);
            return next(err);
        }
        var locale = user.defaultLocale != null ? user.defaultLocale : 'fr';

        var subject = sails.__({
            phrase: 'mail.forgotten.password.subject',
            locale: locale
        });
        var link = "https://toofrench.herokuapp.com/#/resetPassword/" + token;
        var content = sails.__({
            phrase: 'mail.forgotten.password.content',
            locale: locale
        }, {
            link: link
        });
        sails.hooks.email.send(
            'forgottenPassword',
            {
                content: content
            },
            {
                to: email,
                subject: subject
            },
            function (err) {
                if (err) {
                    sails.log.error(err);
                    return next(err);
                }
                return next();
            }
        )
    });
}

function resetPasswordConfirm(userId, next) {
    User.findOne({id: userId}).exec(function (err, user) {
        if (err) {
            sails.log.error(err);
            return next(err);
        }
        var locale = user.defaultLocale != null ? user.defaultLocale : 'fr';

        var subject = sails.__({
            phrase: 'mail.forgotten.confirm.subject',
            locale: locale
        });

        var content = sails.__({
            phrase: 'mail.forgotten.confirm.content',
            locale: locale
        });
        Profile.findOne({id: user.profile}).exec(function (err, profile) {
            if (err) {
                sails.log.error(err);
                return next(err);
            }
            sails.hooks.email.send(
                'general',
                {
                    content: content,
                    userName: profile.firstname
                },
                {
                    to: user.email,
                    subject: subject
                },
                function (err) {
                    if (err) {
                        sails.log.error(err);
                        return next(err);
                    }
                    return next();
                }
            )
        });
    });
}

module.exports = {
    sendAccountCreated: sendAccountCreated,
    sendContactForm: sendContactForm,
    sendMessageReceived: sendMessageReceived,
    sendReservationCreated: sendReservationCreated,
    sendReservationValidated: sendReservationValidated,
    sendReservationCanceled: sendReservationCanceled,
    sendReservationRefused: sendReservationRefused,
    forgottenPassword: forgottenPassword,
    resetPasswordConfirm: resetPasswordConfirm,
    sendProfileValidated: sendProfileValidated,
    sendDiplomaValidated:sendDiplomaValidated
}