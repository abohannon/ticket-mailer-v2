import passport from 'passport';
import jwt from 'jwt-simple';
import User from '../models/user';
import { sendAccountVerificationEmail } from '../services/emailService';
import { loginUser } from '../client/src/actions/authenticationActions';


const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  const exp = timestamp + (60 * 60 * 24 * 1000 * 7);
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
      exp,
    },
    process.env.JWT_SECRET,
  );
};

export const authenticateUser = (req, res) => {
  const { admin, email, name } = req.user;

  const user = {
    admin,
    email,
    name,
  };

  res.status(200).json(user);
};

export const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(500).json({ ...info, errorMessage: err });
    if (!user) return res.status(401).json(info);

    const { admin, email, name } = user;

    res.status(200).json({
      admin,
      email,
      name,
      token: tokenForUser(user),
    });
  })(req, res, next);
};

export const signup = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'You must provide an email, password, and name.' });
  }

  // See if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email,
      password,
      name,
    });

    user.save()
      .then((newUser) => {
        if (!newUser) throw new Error('Error saving new user');

        const timestamp = new Date().getTime();
        const exp = timestamp + (60 * 60 * 24 * 1000);

        const token = jwt.encode(
          {
            sub: newUser.id,
            iat: timestamp,
            exp,
          },
          process.env.JWT_SECRET,
        );

        sendAccountVerificationEmail(email, token);

        return res.status(200).json(newUser);
      })
      .catch((saveErr) => {
        throw new Error(saveErr, 'Error saving new user');
      });
  });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
  const { exp, sub } = decodedToken;
  console.log(decodedToken);
  const now = new Date().getTime();

  if (exp < now) {
    return res.status(401).json({ error: 'Link has expired.' });
  }

  const foundUser = await User.findOne({ _id: sub }).exec();

  if (!foundUser) {
    return res.status(401).json({ error: 'No user found' });
  }
  // TODO: Finish. Need to authenticate user and save token in local storage on client
  res.json(foundUser);
};
