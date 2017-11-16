/**
 * Created by alex on 29/09/15.
 */

module.exports.email = {
    service: 'Mailgun',
    auth: {
        user: process.env.MAILGUN_SMTP_LOGIN,
        pass: process.env.MAILGUN_SMTP_PASSWORD
    },
    from: 'notification@toofrench.net',
    templateDir: 'views/emailTemplates'
    //testMode : true,
};