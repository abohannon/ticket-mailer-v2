import Email from '../models/email';
import sgMail from '../services/sendgridService';
import generatePersonalizations from '../services/emailService';

export const sendEmail = async (req, res) => {
  const {
    content, orders, showTitle, variantTitle, artistName,
  } = req.body;

  try {
    const personalizations = await generatePersonalizations(orders);

    const message = {
      personalizations,
      from: 'no-reply@showstubs.com',
      subject: `Your SHOWstubs Ticket for ${showTitle}`,
      html: '<h1>Testing</h1>',
    };

    const response = await sgMail.sendMultiple(message);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const saveEmail = async (req, res) => {
  const { variant_id } = req.body;

  try {
    const email = await Email.findOneAndUpdate({ variant_id }, req.body, { upsert: true, new: true });

    if (!email) {
      throw new Error('Error saving email');
    }

    return res.status(201).json(email);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const fetchEmail = async (req, res) => {
  const { variant_id } = req.query;

  try {
    const foundEmail = await Email.findOne({ variant_id });

    let response = foundEmail;

    if (!foundEmail) {
      response = { error: 'No email found' }; // successful request, but no content found
    }

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
