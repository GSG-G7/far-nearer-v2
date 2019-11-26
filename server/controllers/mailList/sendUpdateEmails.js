const { readFileSync } = require('fs');
const { join } = require('path');
require('dotenv').config();
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const log = require('simple-node-logger').createSimpleFileLogger('error.log');

const {
  mailList: { getEmails },
} = require('../../models/queries/');

module.exports = cron.schedule(
  '0 23 * * *',
  async () => {
    try {
      const allEmails = await getEmails();
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const html = readFileSync(
        join(__dirname, 'template', 'updateEmail.html'),
      );
      allEmails.forEach(async email => {
        try {
          const mailOption = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Far Nearer',
            html,
          };
          await transport.sendMail(mailOption);
        } catch (e) {
          log.error(e);
        }
      });
    } catch (error) {
      log.error(error);
    }
  },
  { scheduled: false },
);
