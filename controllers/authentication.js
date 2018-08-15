const jwt = require('jwt-simple');
const User = require('../models/user');
const passport = require('passport');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    { sub: user.id, iat: timestamp },
    process.env.JWT_SECRET
  )
}

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(500).json({ ...info, errorMessage: err });
    if (!user) return res.status(402).json(info)
    
    res.status(200).json({ token: tokenForUser(user) });
  })(req, res, next);
};

exports.signup = (req, res, next) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(422).send({ error: 'You must provide an email, password, and name.' })
  }

  // See if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);
    
    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email already in use.' });
    }
    
    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email,
      password,
      name,
    });

    user.save((err) => {
      if (err) return next(err);

      // Respond to request indicating user was created
      res.json({ token: tokenForUser(user) });
    });
  })
}