const roomList = require('./rooms');

// Gete a list of the rooms and how many users are in each
const rooms = io => {
  roomList.forEach((room, i) => {
    const name = room.name.toLowerCase();
    roomList[i].users = (io.sockets.adapter.rooms[name] || []).length;
  });
  return roomList;
};

// Write a message to everyone in the user's room
// - type ('join', 'message', 'leave'): the type of message to send,
// - extra Object: some extra data to send
// Default data being sent to everyone:
// - user: the user performing the action
// - total: the total number of users in the room
const broadcast = (type, extra = {}) => ctx => {

  // Using native namespaces as they are roughly equivalent to rooms
  // Room people: http://stackoverflow.com/a/24425207/938236
  const data = Object.assign({}, {
    user: ctx.socket.username,
    room: ctx.socket.room,
    total: (ctx.io.sockets.adapter.rooms[ctx.socket.room] || []).length
  }, extra);
  ctx.io.to(ctx.socket.room).emit(type, data);

  ctx.io.emit('rooms', { rooms: rooms(ctx.io) });
};

// Create username
exports.login = ctx => {
  ctx.socket.username = ctx.data;
  ctx.socket.emit('login', { user: ctx.data, rooms: rooms(ctx.io) });
};

// Tell everyone in the room that the user is joining them
exports.join = ctx => {
  ctx.socket.room = ctx.data;
  ctx.socket.join(ctx.data);
  return broadcast('join');
};

// Send a specific message to all users in the user's room
exports.message = ctx => {
  return broadcast('message', { message: ctx.data });
};

// Tell everyone in the room that the current user is leaving
exports.leave = ctx => {
  return broadcast('leave');
};
