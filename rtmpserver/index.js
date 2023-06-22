const NodeMediaServer = require('node-media-server');
require('dotenv').config()
console.log(process.env.USERNAMEJD)
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
  ,  /*auth: {
    play: true,
   publish: true,
  secret: 'nodemedia2017privatekey',
api : true,
    api_user: 'admin',
    api_pass: 'nms2018'
  } */
};

var nms = new NodeMediaServer(config)
nms.run();