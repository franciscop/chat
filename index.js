// Entry file
// Some options, create routes and launch the server
const server = require('server');
const { get, socket, error } = server.router;
const { file } = server.reply;
const ctrl = require('./server/controller');
const fs = require('mz/fs');

server({ connect: { favicon: __dirname + '/public/favicon.png' } }, [
  get('*', file('index.html')),
  socket('login', ctrl.login),
  socket('join', ctrl.join),
  socket('message', ctrl.message),
  socket('leave', ctrl.leave),
  socket('disconnect', ctrl.leave),
  error('*', ctx => { console.log(ctx.error); })
]);
