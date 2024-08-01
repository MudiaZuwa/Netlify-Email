const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.REACT_APP_CLIENT_URL, // Replace with your React app's URL
  })
);
app.use(bodyParser.json());

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // you can use any email service
    auth: {
      user: "mudiaosazuwa@gmail.com", // your email
      pass: "mgnd wumj xskx rzpz", // your email password
    },
  });

  // Set up email data
  let mailOptions = {
    from: email,
    to: "mudiaosazuwa@gmail.com", // admin email
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send email
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
