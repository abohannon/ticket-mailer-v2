const jwt = require('jwt-simple');
const User = require('../models/user');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    { sub: user.id, iat: timestamp },
    process.env.JWT_SECRET
  )
}

exports.signin = (req, res, next) => {
  // User has already had email and password authed
  // Just need a token
  console.log(req.user)
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' })
  }

  // See if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);
    
    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email in use' });
    }
    
    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email,
      password,
    });

    user.save((err) => {
      if (err) return next(err);

      // Respond to request indicating user was created
      res.json({ token: tokenForUser(user) });
    });
  })
}