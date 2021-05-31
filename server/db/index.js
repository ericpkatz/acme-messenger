//this is the access point for all things database related!

const db = require('./db')
const { TEXT } = db.Sequelize.DataTypes;

const User = require('./models/User')

const Message = db.define('message', {
  text: TEXT
});

Message.belongsTo(User, { as: 'from' });
Message.belongsTo(User, { as: 'to' });

Message.addHook('afterCreate', async(message)=> {
  message = await Message.findByPk(message.id, {
    include: [
      { model: User, as: 'from'},
      { model: User, as: 'to'},
    ]
  });
  const socket = require('../socketServer').sockets().find(socket => socket.userId === message.toId);
  if(socket){
    socket.send(JSON.stringify({type: 'ADD_MESSAGE', message}));
  }
});

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Message
  },
}
