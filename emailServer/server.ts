import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kevichhel@gmail.com', // replace with your Gmail email address
    pass: 'Pattern01!', // replace with your Gmail password or app-specific password
  },
});

app.post('/send-email', (req, res) => {
  const { email, nickname, quizName, grade } = req.body;

  const mailOptions = {
    from: 'kevichhel@gmail.com', // replace with your Gmail email address
    to: email,
    subject: 'Quiz Completion',
    text: `The student ${nickname} has completed your quiz called ${quizName} for a grade of ${grade}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
