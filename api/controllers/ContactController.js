var recaptcha_config = {
    site_key: "6LevQwkTAAAAAA4JNfLATe3528-iLBZihJVQRtI-",
    secrect_key: "6LevQwkTAAAAAGXpHbYjxcMZJuK_UugQW6QZYNrj"
}
var request = require('request');
module.exports = {
    contact: function (req, res) {
        var message = req.allParams().message;
        var recaptcha = req.allParams().recaptcha;
        if (message && recaptcha) {
            request.post(
                'https://www.google.com/recaptcha/api/siteverify',
                {
                    form: {
                        secret: recaptcha_config.secrect_key,
                        response: recaptcha
                    }
                },
                function (error, response, body) {
                    if (error) {
                        res.send(500, "Error verifiying captcha");
                    }
                    else if (response.statusCode == 200) {
                        console.log(body);
                        res.send(200, body);
                    }
                    else {
                        res.send(500, "Unkown error");
                    }
                }
            );
        }
        else {
            res.sendError("Missing argument");
        }
    }
};