const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "mr.sparshpersonal@gmail.com",
        subject: "Mail from Sendgrid",
        text: `Welcome ${name}! Hope you enjoy the service!`,
    });
};

sendExitEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "mr.sparshpersonal@gmail.com",
        subject: "Mail from Sendgrid",
        text: `GoodBye ${name}! Do let us know if there is anything that we can do for you!`,
    });
};

module.exports = {
    sendWelcomeEmail,
    sendExitEmail,
};
