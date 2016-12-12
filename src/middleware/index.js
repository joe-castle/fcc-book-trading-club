export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() || process.env.NODE_ENV === 'test') {
    return next();
  } else {
    res.status(401).send('This actions requires authentication, please login and try again');
  }
};
