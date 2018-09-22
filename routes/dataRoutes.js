import {
  fetchTours,
  fetchShows,
  fetchOrders,
} from '../controllers/dataController';

export default (app) => {
  app.get('/api/fetchTours', fetchTours);
  app.get('/api/fetchShows', fetchShows);
  app.get('/api/fetchOrders', fetchOrders);
};
