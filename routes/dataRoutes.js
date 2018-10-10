import express from 'express';
import passport from 'passport';
import {
  fetchTours,
  fetchShows,
  fetchOrders,
  fetchMetafieldsForResource,
  fetchSingleMetafield,
  saveEmail,
  fetchEmail,
  sendEmail,
} from '../controllers/dataController';
import passportService from '../services/passportService';

const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();
const dataRouter = express.Router();

router.use(requireAuth);

router.get('/fetchTours', fetchTours);
router.get('/fetchShows', fetchShows);
router.get('/fetchOrders', fetchOrders);

router.get('/fetchMetafieldsForResource', fetchMetafieldsForResource);
router.get('/fetchSingleMetafield', fetchSingleMetafield);

router.post('/saveEmail', saveEmail);
router.get('/fetchEmail', fetchEmail);
router.post('/sendEmail', sendEmail);

dataRouter.use('/data', router);

export default dataRouter;
