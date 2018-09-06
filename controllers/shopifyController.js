import shopify from '../services/shopify';
import {
  saveShowsToDatabase,
  fetchShowsFromDatabase,
} from '../services/db-service';

export const fetchTours = async (req, res) => {
  try {
    const tourList = await shopify.collectionListing.list()
    if (tourList.length < 1) throw new Error('No tours found.'); 

    return res.status(200).json(tourList);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching tours', error: err });
  }
};

// TODO: Consolidate into fetchShows
export const fetchAllShows = async (req, res) => {
  try {
    const showsList = await shopify.productListing.list()

    if (!showsList || showsList.length < 1) throw 'No shows found.';

    await saveShowsToDatabase(showsList)
    const shows = await fetchShowsFromDatabase()

    if (!shows) throw 'Error fetching shows.'

    return res.status(200).json(shows)

  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

export const fetchShows = async (req, res) => {
  try {

    // If no collection_id query is present on URL, GET will fetch all shows/products
    const { collection_id } = req.query

    const showsList = await shopify.productListing.list({ collection_id });
 
    if (!showsList || showsList.length < 1) {
      throw 'No shows found for that collection or collection id is incorrect.';
    }

    await saveShowsToDatabase(showsList, collection_id)
    const shows = await fetchShowsFromDatabase()

    if (!shows) throw 'Error fetching shows.'
    
    return res.status(200).json(shows);
  } catch (err) {
    return res.status(500).json({error: err})
  }
}