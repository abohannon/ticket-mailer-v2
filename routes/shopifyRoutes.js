const ShopifyController = require('../controllers/shopifyController');

module.exports = (app) => {
  app.get('/api/fetchTours', ShopifyController.fetchTours)
  app.get('/api/fetchAllShows', ShopifyController.fetchAllShows)
}