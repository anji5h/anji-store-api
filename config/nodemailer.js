const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

//gmail-api config
const OAuth = google.auth.OAuth2;
const myOAuthclient = new OAuth(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET);
myOAuthclient.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

// nodemailer config
const mailer = async function () {
  const accessToken = await myOAuthclient.getAccessToken();
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
};

module.exports = mailer;
