const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check Authorization header (Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'portfolio_secret_key_123');

      // Fetch user and attach to req (excluding password)
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Yetkisiz erişim, kullanıcı bulunamadı.' });
      }

      next();
    } catch (err) {
      console.error('Token verification error:', err.message);
      return res.status(401).json({ message: 'Yetkisiz erişim, geçersiz token.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Yetkisiz erişim, token bulunamadı.' });
  }
};

module.exports = { protect };
