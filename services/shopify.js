import Shopify from 'shopify-api-node';

export default new Shopify({
  shopName: process.env.SHOPIFY_STORE_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_PASSWORD,
});