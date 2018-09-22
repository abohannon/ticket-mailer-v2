import shopify from '../services/shopifyService';
import {
  saveShowsToDatabase,
  fetchShowsFromDatabase,
  filterOrdersByVariantId,
} from '../services/dataService';

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

    if (!showsList || showsList.length < 1) {
      throw new Error('No shows found for that collection or collection id is incorrect.');
    }

    await saveShowsToDatabase(showsList, collection_id);

    const shows = await fetchShowsFromDatabase(collection_id);

    if (!shows) throw new Error('Error fetching shows.');

    return res.status(200).json(shows);
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
