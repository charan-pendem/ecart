import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  let token = req.header('Authorization');

  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  } else {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
};

export { protect, adminOnly };