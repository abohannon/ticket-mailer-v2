import express from 'express';
import passport from 'passport';
import {
  updateUser,
  verifyEmail,
  fetchUsers,
} from '../controllers/userController';
import passportService from '../services/passportService';

// { session: false } tells passport not to create a cookie
const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();
const userRouter = express.Router();

router.post('/updateUser', requireAuth, updateUser);
router.post('/verifyEmail', verifyEmail);

router.get('/fetchUsers', requireAuth, fetchUsers);

userRouter.use('/user', router);

export default userRouter;
