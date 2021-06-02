//this is the access point for all things database related!
const socketUtils = require('../socketUtils');
const db = require('./db')
const { TEXT } = db.Sequelize.DataTypes;

const User = require('./models/User')

const Message = db.define('message', {
  text: TEXT
});

Message.addHook('afterCreate', async(message)=> {
  const socket = socketUtils.getSockets().find(socket => message.toId === socket.userId);
  if(socket){
    message = await Message.findByPk(message.id, {
      include: [
        { model: User, as: 'to'},
        { model: User, as: 'from'},
      ]
    });
    console.log('sending to user');
    socket.send(JSON.stringify({type: 'ADD_MESSAGE', message }));
  }

});

Message.belongsTo(User, { as: 'from' });
Message.belongsTo(User, { as: 'to' });

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Message
  },
}
