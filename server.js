const express = require("express");
const app = express();
const port = 3000;
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`
    type Query{
        hello: String
    }
`);

const resolvers = {
  hello: () => "hello world!",
};

app.use(
  "/graphql",
  graphqlHTTP({ schema, rootValue: resolvers, graphiql: true })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
