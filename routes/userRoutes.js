import passport from 'passport';
import {
  updateUser,
  verifyEmail,
} from '../controllers/userController';
import passportService from '../services/passportService';

// { session: false } tells passport not to create a cookie
const requireAuth = passport.authenticate('jwt', { session: false });

export default (app) => {
  app.post('/api/user/updateUser', requireAuth, updateUser);
  app.post('/api/user/verifyEmail', verifyEmail);
};
