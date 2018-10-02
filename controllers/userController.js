import User from '../models/user';

export const updateUser = async (req, res) => {
  const userId = req.user.id;
  const update = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, update);

    if (!updatedUser) {
      throw new Error('No user found.');
    }

    return res.status(200).send({ status: 200, message: 'Success' });
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
};

export const verifyEmail = (req, res) => {
  console.log(req.body);
};
