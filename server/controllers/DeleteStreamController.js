import DeleteStreamModel from '../models/DeleteStreamModel.js';

const DeleteStreamController = async (req, res) => {
  const streamId = req.params.streamid;
  console.log(streamId+"delete id ");

  try {
    // Delete the stream
    await DeleteStreamModel(streamId);

    return res.json({ message: 'Stream deleted successfully' });
  } catch (error) {
    console.error('Error deleting stream:', error);
    return res.status(500).json({ message: 'Error deleting stream' });
  }
};

export default DeleteStreamController;