import express from 'express';
import passport from 'passport';
import {
  saveEmail,
  fetchEmail,
  sendEmail,
  parseEmailWebhooks,
} from '../controllers/emailController';
import passportService from '../services/passportService';

const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();
const emailRouter = express.Router();

router.post('/saveEmail', requireAuth, saveEmail);
router.get('/fetchEmail', requireAuth, fetchEmail);
router.post('/sendEmail', requireAuth, sendEmail);
router.post('/webhooks', parseEmailWebhooks);

emailRouter.use('/email', router);

export default emailRouter;
