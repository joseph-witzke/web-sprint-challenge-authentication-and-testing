const checkCredentials = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: 'username and password required' });
  } else {
    next();
  }
};

const checkUsernameExists = (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    res.status(401).json({ message: 'invalid credentials' });
  } else {
    next();
  }
};

module.exports = { checkCredentials, checkUsernameExists };
