const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zuritest505@gmail.com',
      pass: 'qwerty5%5',
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

  app.get('/', (re, res) => {
    res.send("Server connected!!")
  })
  
  router.post('/contact', (req, res) => {
    const name = req.body.name;
    const subject = req.body.subject;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "zuritest505@gmail.com",
      subject: `${subject}`,
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });