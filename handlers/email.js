const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');
const email = require('../config/email');


/* https://nodemailer.com/about/ */
// create reusable transporter object using the default SMTP transport
let transpor = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user, // generated ethereal user
        pass: emailConfig.pass, // generated ethereal password
    },
});


// Generar Html

const generarHTML = () => {

    const html = pug.renderFile(`${__dirname}/../views/emails/reestablecer-password.pug`);
    return juice(html);
}




// send mail with defined transport object
let mailOptions = {
    from: 'UpTask <no-replay@uptask.com>', // sender address
    to: "correo@correo.com", // list of receivers
    subject: "Password reset", // Subject line
    text: "Hola", // plain text body
    html: generarHTML()
};


transpor.sendMail(mailOptions);
