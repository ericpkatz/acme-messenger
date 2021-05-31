let _server;
let _sockets = [];
const { models: { User }} = require('./db');

const setServer = (server)=>{
  _server = server; 
  server.on('connection', socket => {
    addSocket(socket);
    socket.send('welcome')
    socket.on('close', ()=> {
      _sockets = _sockets.filter( s => s !== socket);
    });
    socket.on('message', async(data)=> {
      try {
        const message = JSON.parse(data);
        if(message.token){
          socket.userId = (await User.findByToken(message.token)).id;
        }
      }
      catch(ex){
        console.log(ex);
      }
    });
  });
}
const getServer = ()=> _server;
const addSocket = (socket)=> _sockets.push(socket);
const sockets = ()=> _sockets;

module.exports = {
  setServer,
  getServer,
  addSocket,
  sockets
};



