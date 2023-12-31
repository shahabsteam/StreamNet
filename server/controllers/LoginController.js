
import LoginModel from '../models/LoginModel.js'
import jwt from 'jsonwebtoken'
const LoginController = async (req, res) => {
  const { username, password } = req.body;
console.log(username);
  try {
    // Get the user by username
    const user = await LoginModel(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Authentication successful
    return res.status(200).json({ message: 'Login successful' , token : generateAccessToken(user)  });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Error logging in' });
  }
};
const  generateAccessToken = (username)=> {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '7d' });
}
export default LoginController;
