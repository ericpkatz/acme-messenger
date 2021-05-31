const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');
const socketServer = require('./socketServer');

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
    const ws = require('ws');
    socketServer.setServer(new ws.Server({ server }));
  } catch (ex) {
    console.log(require('chalk').red(ex));
    console.log(require('chalk').red(ex.stack));
  }
}

init()
