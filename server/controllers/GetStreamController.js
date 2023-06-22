
import GetStreamsModel from '../models/GetStreamsModel.js'

const GetStreamController = async (req, res) => {
  try {
    const streamid = req.params.streamid;
    // Get streams from the database
    const streams = await GetStreamsModel();

    // Prepare the response
    let response = streams.map(stream => ({
      title: stream.title,
      description: stream.description,
      userEmail: stream.username,
      id: stream.id
    }));
      response = response.filter(stream => stream.id == streamid);


    return res.json(response);
  } catch (error) {
    console.error('Error retrieving streams:', error);
    return res.status(500).json({ message: 'Error retrieving streams' });
  }
};

export default GetStreamController;
