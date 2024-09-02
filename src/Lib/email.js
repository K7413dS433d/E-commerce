import axios from "axios";
const service_id = import.meta.env.VITE_SERVICE_ID; // Replace with your EmailJS service ID
const template_id = import.meta.env.VITE_TEMPLATE_ID; // Replace with your EmailJS template ID
const user_id = import.meta.env.VITE_USER_ID; // Replace with your EmailJS public key
const defaultEmail = import.meta.env.VITE_DEFAULT_EMAIL; // Replace with your default email

//!website link https://dashboard.emailjs.com/sign-in
//!you will find service id here https://dashboard.emailjs.com/admin from the left side bar choose email services
//!you will find template id here https://dashboard.emailjs.com/admin from the left side bar choose email templates
//!you will find user id here https://dashboard.emailjs.com/admin from the left side bar choose account and uou will find public key

async function sendEmail(
  fromName,
  Message,
  replayEmail,
  toMail = defaultEmail
) {
  const template_params = {
    from_name: fromName,
    message: Message,
    reply_to: replayEmail,
    mail_to: toMail,
  };

  await axios.post(
    "https://api.emailjs.com/api/v1.0/email/send",

    {
      service_id,
      template_id,
      user_id,
      template_params,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export default sendEmail;
