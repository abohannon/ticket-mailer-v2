import moment from 'moment';
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

    const message = {
      personalizations,
      from: { email: 'no-reply@showstubs.com', name: 'SHOWstubs' },
      template_id: 'd-3027cf5726c041139347607731e6de9d',
      dynamic_template_data: {
        subject: `Your SHOWstubs Ticket for ${showTitle}`,
        bundle_title: variantTitle,
        artist: artistName,
        show_title: showTitle,
        check_in: moment(check_in).format('h:m a'),
        start_time: moment(start_time).format('h:m a'),
        event_notes,
        pickup_items,
        shipping_items,
        shipping_date: moment(shipping_date).format('M/D/Y'),
        digital_items,
        digital_delivery_date: moment(digital_delivery_date).format('M/D/Y'),
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
