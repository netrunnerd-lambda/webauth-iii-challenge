const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

exports.generateToken = payload => {
  const options = {
    expiresIn: '1hr'
  };

  return jwt.sign(payload, jwtSecret, options);
};

exports.verifyToken = (req, res, next) => {
  let auth = req.headers.authorization;

  if (auth) {
    const [ scheme, token ] = auth.split(' ');

    if (scheme.toUpperCase() === 'BEARER' && token) {
      jwt.verify(token, jwtSecret, (error, decodedToken) => {
        if (error) {
          res.status(401).json({
            message: "COULD NOT VERIFY TOKEN",
            success: false
          });
        } else {
          req.user = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({
        message: "INVALID SCHEME OR MISSING TOKEN",
        success: false
      });
    }
  } else {
    res.status(401).json({
      message: "MISSING `Authorization` HEADER",
      success: false
    });
  }
};