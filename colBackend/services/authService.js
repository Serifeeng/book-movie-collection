const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'portfolio_secret_key_123', {
    expiresIn: '30d'
  });
};

const registerUser = async (username, email, password) => {
  // Check if user already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error('Bu e-posta adresi zaten kayıtlı.');
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    throw new Error('Bu kullanıcı adı zaten alınmış.');
  }

  const user = await User.create({
    username,
    email,
    password
  });

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id)
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Hatalı e-posta veya şifre.');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Hatalı e-posta veya şifre.');
  }

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id)
  };
};

module.exports = {
  registerUser,
  loginUser,
  generateToken
};
