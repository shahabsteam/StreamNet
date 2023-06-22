
import RegisterModel from '../models/RegisterModel.js'

const RegisterController = async (req, res) => {
  const { username, password } = req.body;

  try {


    // Create a new user
    const newUser = await RegisterModel(username, password);
    return res.status(200).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user ' + error });
  }
};

export default RegisterController;
