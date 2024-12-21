import User from "../models/user.model.js"
import jwt  from "jsonwebtoken";



export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
      
      const token = jwt.sign({id: user.id} , process.env.JWT_SECURITY_KEY, {expiresIn: '1d'})
      res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful.' });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in.' });
    }
  };

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user.' });
    }
};

export const logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logout successful.' });
};