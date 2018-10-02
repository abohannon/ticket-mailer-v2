import User from '../models/user';
import { sendUpdatedUserEmail } from '../services/userService';

export const updateUser = async (req, res) => {
  const userId = req.user.id;
  const update = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, update);
    if (!updatedUser) {
      throw new Error('No user found.');
    }

    if (updatedUser.email !== req.body.email) {
      const options = {
        newEmail: req.body.email,
        name: req.body.name,
      };

      const emailResponse = await sendUpdatedUserEmail(options);

      if (!emailResponse) {
        throw new Error('Error sending email');
      }

      console.log(`Email sent to ${req.body.email}`);
    }

    return res.status(200).send({ status: 200, message: 'Success' });
  } catch (err) {
    return res.status(501).send({ error: err.message });
  }
};

export const verifyEmail = (req, res) => {
  console.log(req.body);
};
