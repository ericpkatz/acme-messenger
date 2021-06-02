let _sockets = [];
const setSockets = (sockets)=> {
  console.log('setting sockets');
  _sockets = sockets;
};
const getSockets = ()=> {
  return _sockets;
};

module.exports = {
  getSockets,
  setSockets
};
