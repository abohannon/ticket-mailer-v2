import {
  fetchTours,
  fetchShows,
  fetchOrders,
} from '../controllers/shopifyController';

export default (app) => {
  app.get('/api/fetchTours', fetchTours);
  app.get('/api/fetchShows', fetchShows);
  app.get('/api/fetchOrders', fetchOrders);
};
