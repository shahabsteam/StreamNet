import * as dotenv from 'dotenv'
import express from 'express';
import cors from "cors"
import { authenticateToken } from './verifytoken.js';
import http from 'http'
import  {Server }  from 'socket.io';
import GetStreamsController from './controllers/GetStreamsController.js'
import AddStreamsController from './controllers/AddStreamController.js'
import DeleteStreamsController from './controllers/DeleteStreamController.js'
import EditStreamsController from './controllers/EditStreamController.js'
import bodyParser from 'body-parser';
import LoginController from './controllers/LoginController.js';
import RegisterController from './controllers/RegisterController.js';
import GetStreamController from './controllers/GetStreamController.js';
import ChatController from './controllers/ChatController.js';
dotenv.config();
const app = express();
app.use(cors({
  origin: '*'
}));
const server = http.createServer(app);
const io = new Server(server,{
  cors : {origin: '*'},
  path : "/chat"
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const protectedPath = express.Router()
//add JWT token auth to protected path
protectedPath.use(authenticateToken)
// Handle socket connections on the /chat path
app.use('/chat', (req, res, next) => {
  req.io = io.of('/chat'); // Assign the socket namespace for /chat
  next();
});

// Define your routes and controllers
app.get('/streams', GetStreamsController);
app.post('/streams', AddStreamsController);
app.get('/streams/:streamid', GetStreamController);
app.delete('/streams/:streamid', DeleteStreamsController);
app.patch('/streams/:streamid', EditStreamsController);
app.post('/login', LoginController);
app.post('/register', RegisterController);

// Handle socket connections for /chat using a controller
app.use('/chat', ChatController);
io.on('connection', (socket) => {
  console.log('A user connected to the chat');

  socket.on('chatMessage', (message) => {
    // Handle chat message
    console.log(message)
    io.emit('message', message); // Emit the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected from the chat');
  });

  socket.on('join', ({ room }) => {
    socket.join(room); // Join the specified room
    console.log(`User joined room: ${room}`);
  });
});


server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});