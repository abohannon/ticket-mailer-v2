import {
  fetchTours,
  fetchShows,
  fetchOrders,
  fetchMetafieldsForResource,
  fetchSingleMetafield,
  saveEmail,
} from '../controllers/dataController';

export default (app) => {
  app.get('/api/fetchTours', fetchTours);
  app.get('/api/fetchShows', fetchShows);
  app.get('/api/fetchOrders', fetchOrders);

  app.get('/api/fetchMetafieldsForResource', fetchMetafieldsForResource);
  app.get('/api/fetchSingleMetafield', fetchSingleMetafield);

  app.post('/api/saveEmail', saveEmail);
};
