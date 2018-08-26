const shopify = require('../services/shopify');

exports.fetchTours = async (req, res) => {
 shopify.collectionListing.list()
  .then(list => res.send(list))
  .catch(err => console.error(err));

}