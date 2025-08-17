const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nooriabdurahman084@gmail.com',     
    pass: 'tokm ynjr lpzq brqq'          
  }
});