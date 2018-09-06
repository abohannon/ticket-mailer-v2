import {
  fetchTours,
  fetchAllShows,
  fetchShows,
} from '../controllers/shopifyController';

export default (app) => {
  app.get('/api/fetchTours', fetchTours)
  app.get('/api/fetchShows', fetchShows)
}