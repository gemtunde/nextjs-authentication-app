import nodemailer from "nodemailer";
import * as handlebars from "handlebars";

interface sendMailProps {
  to: string;
  name: string;
  image: string;
  url: string;
  subject: string;
  template: string;
}

export default async function sendMail(
  to: string,
  name: string,
  image: string,
  url: string,
  subject: string,
  template: string
) {
  const {
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_HOST,
    SMTP_PORT,
    GMAIL_SMTP_EMAIL,
    GMAIL_SMTP_PASSWORD,
  } = process.env;
  let transporter = await nodemailer.createTransport({
    //USING GMAIL SMTP
    service: "gmail",
    auth: {
      user: GMAIL_SMTP_EMAIL,
      pass: GMAIL_SMTP_PASSWORD,
    },
    //USING ELASTIC MAIL SMTP
    // port: Number(SMTP_PORT),
    // host: SMTP_HOST,
    // auth: {
    //   user: SMTP_EMAIL,
    //   pass: SMTP_PASSWORD,
    // },
  });
  //html replacement
  const data = handlebars.compile(template);
  const replacements = {
    name: name,
    email_link: url,
    image: image,
  };
  const html = data(replacements);
  //verify connection config
  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("server is listening...");
        resolve(success);
      }
    });
  });

  //send mail
  const options = {
    from: SMTP_EMAIL,
    to,
    subject,
    html,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}
