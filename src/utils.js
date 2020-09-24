import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};



const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
    const DOMAIN = 'Doostagram';
    const mg = mailgun({apiKey: process.env.API_KEY, domain: DOMAIN});
    const data = {
        from: "dlengjs123@gmail.com",
        to: adress,
        subject: "🔒Login Secret for Prismagram🔒",
        text: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
    };
    mg.messages().send(data, function (error, body) {
        console.log(error,body);
    });
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
