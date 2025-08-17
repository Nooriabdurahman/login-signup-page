const { transporter } = require('../connect/nodemailer'); // اضافه شد
const generateCode = require('../utils/genratecode');

const codes = {}; 


exports.sendcode = async (req, res)=>{
   const { email } = req.body;
  const code = generateCode();
  codes[email] = code;

  try {
    await transporter.sendMail({
      from: `"Verification" <YOUR_EMAIL@gmail.com>`,
      to: email,
      subject: 'Your Verification Code',
      html: `<h2>Your Code: <code>${code}</code></h2>`
    });

    res.json({ success: true, message: 'Code sent to your email!' });
  } catch (err) {
    console.log('خطا در ارسال ایمیل:', err);  // اینجا خطا را لاگ می‌کنیم
    res.json({ success: false, message: 'Error sending email!' });
  }
}
exports.verfycode = async (req, res) =>{
    const { email, code } = req.body;
  if (codes[email] && codes[email] === code.toUpperCase()) {
    res.json({ success: true, message: '✅ Code is correct!' });
    delete codes[email]; // حذف کد بعد از تایید موفق
  } else {
    res.json({ success: false, message: '❌ Code is incorrect.' });
  }
}