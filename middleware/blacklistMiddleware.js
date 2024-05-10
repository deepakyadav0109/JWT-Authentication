const tokenBlacklist = new Set();

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: Token has been revoked' });
  }
  next();
};
