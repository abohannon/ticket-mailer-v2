const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// { session: false } tells passport not to create a cookie
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.get('/api/test', (req, res) => res.send({ hello: "world" }) );
  app.post('/api/auth/login', Authentication.login);
  app.post('/api/auth/signup', Authentication.signup);
}