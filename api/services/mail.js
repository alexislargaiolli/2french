/**
 * Created by alex on 10/11/15.
 */
function sendAccountCreated(user, callback) {

}

function sendContactForm(user, callback) {

}

/* Reservation */

function sendReservationCreated(user, reservation) {

}

function sendReservationValidated(user, reservation) {

}

function sendReservationCanceled(user, reservation) {

}

function sendReviewToAdd(user, reservation) {

}

function sendReviewAdded(user, reservation, review) {

}

/* Message */

function sendMessageReceived(user, userName, authorName, messageContent) {
    var locale = user.defaultLocale;
    sails.log.info(locale);
    var subject = sails.__({
        phrase: 'mail.message.new.subject',
        locale: locale
    }, {name : authorName});
    sails.hooks.email.send(
        'message',
        {
            userName: userName,
            authorName: authorName,
            messageContent : messageContent
        },
        {
            to: user.email,
            subject: subject
        },
        function (err) {
            if (err) {
                console.log(err);
                return serverError('Impossible d\'envoyer l\'email...');
            }
        }
    )
}

function sendGeneralMessage(email, subject, title, content, locale) {
    sails.hooks.email.send(
        'general',
        {
            title: title,
            content: content
        },
        {
            to: email,
            subject: subject
        },
        function (err) {
            if (err) {
                console.log(err);
                return serverError('Impossible d\'envoyer l\'email...');
            }
            res.send(200, body);
        }
    )
}

module.exports = {sendAccountCreated: sendAccountCreated}
module.exports = {sendContactForm: sendContactForm}
module.exports = {sendMessageReceived: sendMessageReceived}
