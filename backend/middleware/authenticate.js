const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    const verifyToken = jwt.verify(token, 'mynameisabdurrehman');
    // TODO: verifytoken:user ke details a gye hai: aus details se user ka data get kar sakta:
    const rootuser = await User.findOne({
      _id: verifyToken._id,
      'tokens.token': token,
    }); // user available
    if (!rootuser) {
      throw new Error('User Not Found');
    }
    req.token = token;
    req.usertype = rootuser.usertype;
    req.userId = rootuser._id;
    console.log(req.path);
    next();
  } catch (err) {
    res.status(401).send('UnAuthorized !! nO ToKEN provided ');
    console.log(err);
  }
};

module.exports = authenticate;
