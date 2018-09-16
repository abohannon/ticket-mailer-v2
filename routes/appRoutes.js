import passport from 'passport';
import { login, signup, authenticateUser } from '../controllers/authentication';
import passportService from '../services/passport-service';

// { session: false } tells passport not to create a cookie
const requireAuth = passport.authenticate('jwt', { session: false });

export default (app) => {
  app.post('/api/auth/login', login);
  app.post('/api/auth/signup', signup);
  app.get('/api/auth/user', requireAuth, authenticateUser);
};
