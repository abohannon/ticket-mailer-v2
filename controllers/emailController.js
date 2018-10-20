import Email from '../models/email';
import sgMail from '../services/sendgridService';
import { generatePersonalizations } from '../services/emailService';

export const parseEmailWebhooks = (req, res) => {
  const { events } = req.body;

  console.log(req.body);
};

export const sendEmail = async (req, res) => {
  const {
    content, orders, showTitle, variantTitle, artistName,
  } = req.body;

  const {
    check_in,
    digital_delivery_date,
    digital_items,
    event_notes,
    pickup_items,
    shipping_date,
    shipping_items,
    start_time,
  } = content;

  try {
    const personalizations = await generatePersonalizations(orders);
    // TODO: Some substitutions/template variables aren't working e.g. subject. Need to fix.
    const message = {
      personalizations,
      from: 'no-reply@showstubs.com',
      subject: `Your SHOWstubs Ticket for ${showTitle}`,
      template_id: 'd-3027cf5726c041139347607731e6de9d',
      dynamic_template_data: {
        bundle_title: variantTitle,
        artist: artistName,
        showTitle,
        check_in,
        start_time,
        event_notes,
        pickup_items,
        shipping_items,
        shipping_date,
        digital_items,
        digital_delivery_date,
      },
    };

    const response = await sgMail.sendMultiple(message);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err.toString());
    return res.status(500).json({ error: err.message, sendGrid_error: err.response });
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
