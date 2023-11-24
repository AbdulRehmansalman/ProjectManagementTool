const User = require('../models/user');
const bcrypt = require('bcryptjs');

const SignUp = async (req, res) => {
  const { name, email, password, usertype } = req.body;
  if (!email || !password || !usertype) {
    return res.status(422).json({ error: 'fill all the feilds of the form' });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: 'Email already Exist' });
    } else {
      const adduser = new User({ name, email, password, usertype });

      // Middleware:Hashing takes Place here:
      const data = await adduser.save();
      console.log(data);
      if (data) {
        return res.status(200).json({ message: 'User Data saved succesfuuly' });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
const SignIn = async (req, res) => {
  const { email, password, usertype } = req.body;
  if (!email || !password || !usertype) {
    return res.status(422).json({ error: 'fill all the feilds of the form' });
  }
  //* if it finds Data will be returned else null will be returned
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    //* check if both the passwords are same or not
    const isMatched = await bcrypt.compare(password, userExist.password);
    const token = await userExist.generateAuthToken();

    if (isMatched) {
      res.cookie('jwttoken', token, {
        expires: new Date(Date.now() + 30000000),
        httpOnly: true,
      });
      console.log(token);
      if (userExist.usertype !== usertype) {
        res.status(400).send('null');
      } else {
        res.status(200).send(usertype);
        console.log('Login SuccesFull');
      }
    } else {
      return res.status(422).json({ error: 'invalid credentials pass' });
    }
  } else {
    return res.status(422).json({ error: 'invalid credentials email' });
  }
};
module.exports = {
  SignUp,
  SignIn,
};
