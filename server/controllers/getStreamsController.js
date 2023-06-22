
import GetStreamsModel from '../models/GetStreamsModel.js'

const GetStreamsController = async (req, res) => {
  try {
    // Get streams from the database
    const streams = await GetStreamsModel();

    // Prepare the response
    const response = streams.map(stream => ({
      title: stream.title,
      description: stream.description,
      userEmail: stream.username,
      id: stream.id
    }));

    return res.json(response);
  } catch (error) {
    console.error('Error retrieving streams:', error);
    return res.status(500).json({ message: 'Error retrieving streams' });
  }
};

export default GetStreamsController;
