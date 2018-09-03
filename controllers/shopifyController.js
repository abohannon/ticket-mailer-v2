const shopify = require('../services/shopify');

exports.fetchTours = async (req, res) => {
  try {
    const tourList = await shopify.collectionListing.list()
    if (tourList.length < 1) throw new Error('No tours found.'); 

    return res.status(200).json(tourList);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching tours', error: err });
  }
};

exports.fetchAllShows = async (req, res) => {
  try {
    const showsList = await shopify.productListing.list()
    if (showsList.length < 1) throw new Error('No shows found.');

    return res.status(200).json(showsList);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching shows', error: err });
  }
}