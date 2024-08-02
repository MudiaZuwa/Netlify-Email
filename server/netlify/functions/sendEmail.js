const express = require("express");
const serverless = require("serverless-http");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mudiaosazuwa@gmail.com",
      pass: "mgnd wumj xskx rzpz",
    },
  });

  let mailOptions = {
    from: email,
    to: "mudiaosazuwa@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

module.exports.handler = serverless(app);
