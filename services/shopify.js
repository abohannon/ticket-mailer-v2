const Shopify = require('shopify-api-node');

module.exports = new Shopify({
  shopName: process.env.SHOPIFY_STORE_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_PASSWORD,
});