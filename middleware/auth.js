const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Get token from the header
  const token = req.header('Authorization');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // This is the function that was breaking
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
