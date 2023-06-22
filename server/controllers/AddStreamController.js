
import AddStreamModel from "../models/AddStreamModel.js";

const AddStreamController = async (req, res) => {
  const { title, description, streamkey, userEmail } = req.body;

  try {
    // Add a new stream
    const newStream = await AddStreamModel(title, description, streamkey, userEmail);

    return res.status(200).json(newStream);
  } catch (error) {
    console.error('Error adding stream:', error);
    return res.status(500).json({ message: 'Error adding stream' });
  }
};

export default AddStreamController;

