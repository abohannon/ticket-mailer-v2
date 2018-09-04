import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

// On Save Hook, encrypt password
// Before save, run this function
userSchema.pre('save', function(next) {
  const user = this;

  // generate salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // encypt password
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    })
  })
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  })
};

// Creat the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
export default ModelClass;