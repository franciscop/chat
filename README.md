# Blackstorm Chat - https://blackstorm.chat/

> Note: the domain will be transfered to you or released as soon as the interview process is over.

Real time chat based on socket.io with a front-end made with React.js and Materialize.css. It supports usernames, multiple rooms and multiple devices.


## Getting started

First make sure that you have **Node.js 7.6** or above.

Then install the project locally:

```bash
git clone git@github.com:franciscop/chat.git
cd ./chat
npm install

# Actually run it
npm start
```


## Development

If you want to test front-end things, you'll have to run this in another terminal:

```bash
webpack --watch
```


## Deployment

To deploy it for instance to Heroku, first create the project in Heroku and [follow the official instructions](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote):

```bash
# Add and commit any change as normal
# ...

# Add the remote with heroku
heroku git:remote -a HEROKU_PROJECT_NAME

# Push the code with Heroku
git push heroku master
```






## Known bugs

There are some known no-fix bugs for this version. If the webapp was to move forward they would have to be addressed in some way, but for the scope of this interview I think it's reasonable not to fix these.

- Data Validation: the username and messages can consist on any characters. While it'd be easy to Regex them in English, then we'd also have to allow for Japanese characters [(Regex's Unicode is still experimental)](http://kangax.github.io/compat-table/es6/#test-RegExp_y_and_u_flags).
- Non-unique usernames: right now anyone can register with a username already on use.
- Multiple tabs. Related to the previous one, when a user opens multiple tabs they are treated as different users with the same username.
