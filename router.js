const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// { session: false } tells passport not to create a cookie
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.post('/api/signin', requireSignin, Authentication.signin)
  
  app.post('/api/signup', Authentication.signup);
}