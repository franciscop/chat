# Blackstorm Chat - https://blackstorm.chat/

> Note: the domain will be transfered to you or released as soon as the interview process is over.

Realtime chat based on socket.io with a front-end made with React.js and Materialize.css. It supports usernames, multiple rooms and multiple devices.

To run it locally:

```bash
git clone TODO
cd ./chat
npm install

# Actually run it
npm start
```








## Known bugs

There are some known no-fix bugs for this version. If the webapp was to move forward they would have to be addressed in some way, but for the scope of this interview I think it's reasonable to keep them.

- Non-unique usernames: right now anyone can register with a username already on use.
- Multiple tabs. Related to the previous one, when a user opens multiple tabs they are treated as different users with the same username.
-
