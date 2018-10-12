import express from 'express';
import passport from 'passport';
import {
  updateUser,
  verifyEmail,
  fetchUsers,
  deleteUser,
} from '../controllers/userController';
import passportService from '../services/passportService';

// { session: false } tells passport not to create a cookie
const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();
const userRouter = express.Router();

router.post('/updateUser', requireAuth, updateUser);
router.post('/verifyEmail', verifyEmail);

router.get('/fetchUsers', requireAuth, fetchUsers);

router.delete('/deleteUser', requireAuth, deleteUser);

userRouter.use('/user', router);

export default userRouter;
