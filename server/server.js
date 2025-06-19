import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: "1", name: "Deneth", age: 30, isMarried: true },
  { id: "2", name: "Kavindu", age: 30, isMarried: false },
  { id: "3", name: "Lakmal", age: 30, isMarried: true },
];

const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }
  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User
  }
  type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
  }
`;

const resolvers = {
  Query: {
    getUsers: () => users,
    getUserById: (parent, args) => users.find((user) => user.id === args.id),
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server running at http://localhost:4000/");
