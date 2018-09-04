import { login, signup, authenticateUser } from '../controllers/authentication';
import passportService from '../services/passport';
import passport from 'passport';

// { session: false } tells passport not to create a cookie
const requireAuth = passport.authenticate('jwt', { session: false });

export default (app) => {
  app.post('/api/auth/login', login);
  app.post('/api/auth/signup', signup);
  app.get('/api/auth/user', requireAuth, authenticateUser);
}