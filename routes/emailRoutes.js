import express from 'express';
import passport from 'passport';
import {
  saveEmail,
  fetchEmail,
} from '../controllers/emailController';
import passportService from '../services/passportService';

const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();
const emailRouter = express.Router();

router.use(requireAuth);

router.post('/saveEmail', saveEmail);
router.get('/fetchEmail', fetchEmail);

emailRouter.use('/email', router);

export default emailRouter;
