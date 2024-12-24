import User from "../models/user.model.js"

export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
      .select('-password')
      .populate('quizzesCreated', 'title plays')
      .populate('quizzesTaken.quiz','title')
      
      if (!user) return res.status(404).json({ message: 'User not found.' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user profile.' });
    }
  };

export const updateUserProfile = async (req, res) => {
    const { username, email, password, avatar, bio } = req.body;
    try {
      const existingUsername = await User.findOne({ username });
      const existingEmail = await User.findOne({ email });
  
      if (existingUsername && existingUsername.id !== req.user.id) {
        return res.status(400).json({ message: 'Username is already taken.' });
      }
      if (existingEmail && existingEmail.id !== req.user.id) {
        return res.status(400).json({ message: 'Email is already registered.' });
      }
  
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found.' });
  
      user.username = username || user.username;
      user.email = email || user.email;
      user.password = password || user.password;
      user.avatar = avatar || user.avatar;
      user.bio = bio || user.bio;
  
      await user.save();
      
      const { password: userPassword, ...userDataWithoutPassword } = user.toObject();
      res.json( userDataWithoutPassword);
    } catch (err) {
      res.status(500).json({ message: 'Error updating profile.' });
    }
  };
  