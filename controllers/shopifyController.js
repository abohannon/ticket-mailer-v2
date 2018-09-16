import shopify from '../services/shopify-service';
import {
  saveShowsToDatabase,
  fetchShowsFromDatabase,
  fetchAllShowsFromDatabase,
} from '../services/db-service';

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
