const express = require("express");
const app = express();
const port = 3000;
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const users = [
  {
    id: "1",
    name: "walid",
  },
  {
    id: "2",
    name: "yassine",
  },
];

const schema = buildSchema(`
    type User{
      id:String,
      name:String
    }
    type Query{
        getUsers: [User]
        getUserById(id: String): User
    }
    type Mutation{
      createUser(id:String, name:String):User
    }
`);

const userQueries = {
  hello: () => "hello world!",
  getUsers: () => users,
  getUserById: (args) => users.find((user) => user.id === args.id),
};

const userMutations = {
  createUser: ({id, name}) => {
    const createdUser = {id, name};
    users.push(createdUser);
    return createdUser
  },
};

const resolvers = {
  ...userQueries,
  ...userMutations,
};

app.use(
  "/graphql",
  graphqlHTTP({ schema, rootValue: resolvers, graphiql: true })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
