//this is the access point for all things database related!

const db = require('./db')
const { TEXT } = db.Sequelize.DataTypes;

const User = require('./models/User')

const Message = db.define('message', {
  text: TEXT
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
