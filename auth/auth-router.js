const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const router = require('express').Router();

const Users = require('../users/users-model.js')

router.get('/', (req, res) => {
  res.json({ we: 'in the auth' });
});

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;
  
  const hash = bcryptjs.hashSync(user.password, 12);
  user.password = hash
  
  try {
    const saved = Users.add(user);
    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  };
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy({ username: username })
  .first()
  .then(user => {
    if (user && bcryptjs.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: 'Access granted', token});
    } else {
      res.status(401).json({ message: 'Incorrect credentials' });
    }
  })
  .catch(error => {
    res.status(500).json({ message: error.message });
  });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '3h'
  }
  
  const secret = secrets.jwtSecret;

  return jwt.sign(payload, secret, options);
}

module.exports = router;
