const shopify = require('../services/shopify');

exports.fetchTours = async (req, res) => {
  try {
    const list = await shopify.collectionListing.list()
    if (list.length < 1) throw 'No tours found.' 

    return res.status(200).json(list)

  } catch (err) {
    res.status(500).json({ message: 'Error fetching tours', error: err })
  }
}