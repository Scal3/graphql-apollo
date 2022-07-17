const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors');
const shema = require('./shema');
const users = [{id: 0, username: "Sanya", age: 12}];

const app = express();
const PORT = process.env.PORT | 5000;
app.use(cors());

const createUser = (input) => {
  return {
    id: Date.now(),
    ...input
  }
}

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({id}) => {
    return users.find(user => user.id === id);
  },
  createUser: ({input}) => {
    const user = createUser(input);
    users.push(user);
    return user;
  }
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: shema,
  rootValue: root
}));

const start = () => {
  app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`);
  })
}

start();