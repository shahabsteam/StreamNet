
const ChatController = (req, res) => {
  const io = req.io;

  io.on('connection', (socket) => {
    console.log('A user connected to the chat');

    socket.on('chatMessage', (message) => {
      // Handle chat message
      io.emit('message', message); // Emit the message to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected from the chat');
    });
  });


 
};

export default ChatController;
