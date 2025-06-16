import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone"

const users = [
    {id:"1", name:"Deneth" , age:30 ,isMarried:true},
     {id:"2", name:"kavindu" , age:30 ,isMarried:false},
      {id:"3", name:"Lakmal" , age:30 ,isMarried:true},
]

const typeDefs = `
        type Query{
            getUsers:[User]
            getUserById(id:Id!):User
        }
        type Mutation {
            createUser(name:String!, age:Int!,isMarried: Boolean!):User
        }
        type User{
            id:Id
            name:String
            age:Int
            isMarried: Boolean
        }
`
const resolvers ={
    Query:{
        getUsers:() =>{
            return users;
        },
    getUserById: (parent, args) =>{
        const id = args.id;
        return users.find((user) =>user.id===id);
    },
    },
    Mutation:{
        CreateUser:(parent,args) =>{
            const {name ,age ,isMarried}=args
            const newUser = {
                id:(users.length+1).toString(),
                name,
                age,
                isMarried,
            };
            users.push(newUser);
        }
    }
}

const server = new ApolloServer({typeDefs,resolvers});

const {} = await startStandaloneServer(server,{
    listen: {port:4000},
})
console.log('server running')