import shopify from '../services/shopifyService';
import sgMail from '../services/sendgridService';
import {
  filterOrdersByVariantId,
  addMetafieldsToShows,
  fetchMetafields,
  generatePersonalizations,
} from '../services/dataService';
import Email from '../models/email';

export const fetchTours = async (req, res) => {
  try {
    const tourList = await shopify.collectionListing.list();
    if (tourList.length < 1) throw new Error('No tours found.');

    return res.status(200).json(tourList);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const fetchShows = async (req, res) => {
  try {
    // collection_id is optional
    const { collection_id } = req.query;

    const showsList = await shopify.productListing.list({ collection_id });

    const modifiedShowsList = await addMetafieldsToShows(showsList);

    res.status(200).json(modifiedShowsList);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const fetchOrders = async (req, res) => {
  try {
    const { variant_id } = req.query;

    const orders = await shopify.order.list();

    // if a variant_id query is passed, filter the orders for that variant
    if (Object.keys(req.query).includes('variant_id')) {
      const variantOrders = filterOrdersByVariantId(orders, variant_id);
      return res.status(200).json(variantOrders);
    }

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* Email Content Controllers */

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

/*  Metafield Controllers */

export const fetchMetafieldsForResource = async (req, res) => {
  const { owner_resource, owner_id } = req.query;

  try {
    const metafields = await fetchMetafields(owner_resource, owner_id);

    res.status(200).json(metafields);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const fetchSingleMetafield = async (req, res) => {
  const { id } = req.query;

  try {
    const metafield = await shopify.metafield.get(id);

    res.status(200).json(metafield);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
