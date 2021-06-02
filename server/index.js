const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');
const ws = require('ws');
const socketUtils = require('./socketUtils');

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
    const socketServer = new ws.Server({ server });
    let sockets = [];
    socketServer.on('connection', (socket)=> {
      sockets.push(socket);
      socketUtils.setSockets(sockets);
      socket.send(JSON.stringify({ message: 'hello'}));
      socket.on('close', ()=> {
        sockets = sockets.filter(s => s !== socket);
        socketUtils.setSockets(sockets);
      });
      socket.on('message', async(data)=> {
        const obj = JSON.parse(data);
        if(obj.token){
          const user = await db.models.user.findByToken(obj.token);
          socket.userId = user.id;
        }
      });
      console.log(sockets.length);
    });


  } catch (ex) {
    console.log(require('chalk').red(ex));
    console.log(require('chalk').red(ex.stack));
  }
}

init()
