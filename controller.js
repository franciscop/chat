// Write a message to everyone in the user's room
// - type ('join', 'message', 'leave'): the type of message to send,
// - extra Object: some extra data to send
// Default data being sent to everyone:
// - user: the user performing the action
// - total: the total number of users
const broadcast = (type, extra = {}) => ctx => {
  console.log(ctx.data);
  // Using native namespaces as they are roughly equivalent to rooms
  ctx.io.to(ctx.socket.room).emit(type, Object.assign({}, {
    user: ctx.socket.username,
    room: ctx.socket.room,
    total: ctx.io.sockets.clients(ctx.data.room).length
  }, extra));
};

// Create username
exports.login = ctx => {
  ctx.socket.username = ctx.data;
  ctx.socket.emit('login', ctx.data);
};

// Tell everyone in the room that the user is joining them
exports.join = ctx => {
  ctx.socket.room = ctx.data;
  ctx.socket.join(ctx.data);
  return broadcast('join');
};

// Send a specific message to all users in the user's room
exports.message = ctx => {
  return broadcast('message', {
    message: ctx.data.message
  });
};

// Tell everyone in the room that the current user is leaving
exports.leave = ctx => {
  return broadcast('leave');
};
