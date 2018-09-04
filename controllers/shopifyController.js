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

export const fetchAllShows = async (req, res) => {
  try {
    const showsList = await shopify.productListing.list()

    if (showsList.length < 1) throw new Error('No shows found.');

    // TODO: Refactor this to be a promise?
    saveShowsToDatabase(showsList)
    // fetchShowsFromDatabase()

    return res.status(200).json({ message: 'Shows updated' })

  } catch (err) {
    console.log({ message: 'Error fetching shows', error: err })
    res.status(500).json({ message: 'Error fetching shows', error: err });
  }
}