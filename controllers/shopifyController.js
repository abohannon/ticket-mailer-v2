const Show = require('../models/show');
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

    // TODO: Break DB query into service
    // TODO: Also create check for last_updated to make sure the most recent shows
    // are saved in the DB.
    showsList.forEach((show) => {
      Show.findOne({ product_id: show.product_id }, (err, foundShow) => {
        if (err) throw new Error({ message: 'Error finding show', error: err })
        if (foundShow) {
          return console.log('Show already exists')
        }

        if (!foundShow) {
          const newShow = new Show({
            product_id: show.product_id,
            handle: show.handle,
            updated_at: show.updated_at,
            title: show.title,
            variants: show.variants,
            vendor: show.vendor,
          }) 
          console.log(`${show.product_id} saved!`)
          return newShow.save()
        }
      })
    })

    return res.status(200).json({ message: 'Shows updated' })

  } catch (err) {
    console.log({ message: 'Error fetching shows', error: err })
    res.status(500).json({ message: 'Error fetching shows', error: err });
  }
}