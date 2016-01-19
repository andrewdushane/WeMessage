var nodemailer = require('nodemailer');
var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};
var transporter = nodemailer.createTransport(smtpConfig);

var counter = 0;
if(counter > 1) {
  transporter.sendMail(mailData, function(data) {
    console.log(data);
    console.log('sent mail');
    counter++;
  });
}

module.exports.inviteToChat = function(req, res, next) {
  if(req.body.sender && req.body.chatUrl && req.body.recipientEmail && req.body.recipientName) {
    var mailData = {
      from: 'WeMessage <wemessageapp@gmail.com>',
      to: req.body.recipientEmail,
      subject: req.body.sender + ' has invited you to chat!',
      text: 'Hi, ' + req.body.recipientName + '. ' + req.body.sender + ' would like you to join their discussion on WeMessage. Click on this URL or copy and paste it into a web browser to join now. Link: ' + req.body.chatUrl,
      html: '<p>Hi, ' + req.body.recipientName + '</p><p>' + req.body.sender + ' would like you to join their discussion on WeMessage. <a href="' + req.body.chatUrl + '">Click here</a> to join now!</p><p>If the above link doesn&rsquo;t work,  copy and paste this URL into your web browser: <br>' + req.body.chatUrl + '</p><p>Have a great day!</p><p style="font-weight: bold">The WeMessage team</p>'
    };
    transporter.sendMail(mailData, function() {
    });
    res.json({
      status: 200,
      message: 'Email delivered.'
    });
  } else {
    res.json({
      status: 400,
      message: 'Please provide all required parameters.'
    });
  }
}
