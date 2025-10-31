const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "manishshirsat2850@gmail.com",
    pass: process.env.PASS,
  },
});

const mailOption = {
    //it has 4 parameters from,to,subject and text or message
    from:'abc@gmail.com',
    to:'def@gmail.com',
    subject:"sending email using nodejs",
    text:"this is node js mail"
}

transporter.sendMail(mailOption,(err,info)=>{
    if(err) throw err;
    else{
        console.log(`Email sent:  ${info.response}`)
    }
})