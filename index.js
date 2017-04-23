// Entry file
// Some options, create routes and launch the server
const server = require('server');
const { get, socket } = server.router;
const ctrl = require('./controller');
const fs = require('mz/fs');

server([
  get('*', async ctx => {
    ctx.res.send(await fs.readFile(__dirname + '/index.html', 'utf-8'));
  }),
  socket('login', ctrl.login),
  socket('join', ctrl.join),
  socket('message', ctrl.message),
  socket('leave', ctrl.leave),
  socket('disconnect', ctrl.leave)
]);
