const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// Allow requests from your client's origin
const corsOptions = {
  origin: "https://mail-test-d8ed-klmatlqkp-mudiazuwas-projects.vercel.app",
  methods: "POST,OPTIONS",
  allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.ADMIN_EMAIL,
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
