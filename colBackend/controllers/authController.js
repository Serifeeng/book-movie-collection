const authService = require('../services/authService');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
  }

  try {
    const userData = await authService.registerUser(username, email, password);
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Lütfen e-posta ve şifrenizi girin.' });
  }

  try {
    const userData = await authService.loginUser(email, password);
    res.status(200).json(userData);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const getMe = async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
  }
};

module.exports = {
  register,
  login,
  getMe
};
