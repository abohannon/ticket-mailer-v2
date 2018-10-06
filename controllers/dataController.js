import shopify from '../services/shopifyService';
import {
  filterOrdersByVariantId,
  addMetafieldsToShows,
  fetchMetafields,
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
  let status = 200;

  try {
    const foundEmail = await Email.findOne({ variant_id });

    if (!foundEmail) {
      status = 204; // successful request, but no content found
    }

    return res.status(status).json(foundEmail);
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
