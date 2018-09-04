import { fetchTours, fetchAllShows } from '../controllers/shopifyController';

export default (app) => {
  app.get('/api/fetchTours', fetchTours)
  app.get('/api/fetchAllShows', fetchAllShows)
}