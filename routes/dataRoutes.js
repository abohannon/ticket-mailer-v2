import {
  fetchTours,
  fetchShows,
  fetchOrders,
  createProductMetafield,
  fetchProductMetafields,
} from '../controllers/dataController';

export default (app) => {
  app.get('/api/fetchTours', fetchTours);
  app.get('/api/fetchShows', fetchShows);
  app.get('/api/fetchOrders', fetchOrders);

  app.post('/api/createProductMetafield', createProductMetafield);
  app.get('/api/fetchProductMetafields', fetchProductMetafields);
};
