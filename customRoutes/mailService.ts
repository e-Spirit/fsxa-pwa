import express from 'express'
import nodemailer from 'nodemailer'

interface MailContent {
  email: string
  subject: string
  company: string
  content: string
}

const generateText = ({ email, subject, company, content }: MailContent) => {
  return `
NEW MESSAGE RECEIVED
Data:
Subject: ${subject}
Email: ${email}
Company: ${company}
Content: ${content}
`
}

const generateHTML = ({ email, subject, company, content }: MailContent) => {
  return `
  <h1>NEW MESSAGE RECEIVED</h1>
  <p>Data: 
  <ul>
    <li>Email: ${email}</li>
    <li>Subject: ${subject}</li>
    <li>Company: ${company}</li>
    <li>Content: <pre>${content}</pre></li>
  </ul>
  </p>
`
}

const sendMail = async (mailContent: MailContent) => {
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  })
  const info = await transporter.sendMail({
    from: '"Sending Test Account" <sender@example.com>',
    to: 'Receiving Test Account <receiver@example.com> ',
    subject: 'Test',
    text: generateText(mailContent),
    html: generateHTML(mailContent)
  })
  return info
}

const isEmailValid = (email: string) => {
  return email.includes('@')
}

const router = express.Router()

router.post('/', async (req, res) => {
  const { email, subject, company, content } = req.body
  if (!email || !subject || !company || !content) {
    return res.status(422).send({
      code: 422,
      message: 'Please provide email, subject, company and content'
    })
  }
  if (!isEmailValid(email)) {
    return res
      .status(422)
      .send({ code: 422, message: 'Please provide a valid email' })
  }

  sendMail({
    email,
    subject,
    company,
    content
  })
    .then((info) => {
      console.log(nodemailer.getTestMessageUrl(info))
      res.send(info)
    })
    .catch((err) => {
      res
        .status(err.responseCode || 400)
        .send({ code: err.responseCode || 400, err })
    })
})

export default {
  router,
  route: '/mailService/'
}
