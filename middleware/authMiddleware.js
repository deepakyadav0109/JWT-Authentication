const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  // Get token from request header
  const authHeader = req.header('Authorization');

  // Check if token exists
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Check if token has expired
    if (decoded.exp <= Date.now() / 1000) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    if (error instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        return res.status(401).json({ message: 'Unauthorized token' });
      } else if (error instanceof jwt.TokenExpiredError) {
        // if the error thrown is because the JWT is expired, return a 401 error
        return res.status(401).json({ message: 'Token expired' });
      } else {
        // otherwise, return a 400 bad request error
        return res.status(400).json({ message: 'Bad request' });
      }
  }
};