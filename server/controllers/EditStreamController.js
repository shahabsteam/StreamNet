import EditStreamModel from '../models/EditStreamModel.js';

const EditStreamController = async (req, res) => {
  const streamId = req.params.streamid;
  const { title, description } = req.body;

  try {
    // Call the model function to update the stream
    await EditStreamModel(streamId, title, description);

    // Return a success response
    res.status(200).json({ message: 'Stream updated successfully' });
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the stream' });
  }
};

export default EditStreamController;