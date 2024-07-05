import { ApolloServer, gql } from "apollo-server";

// Sample data for todos
const TODOS = [
    {
        id: '10',
        name: 'izhar',
        completed: true
    },
    {
        id: '20',
        name: 'unknown',
        completed: true
    },
    {
        id: '30',
        name: 'brook',
        completed: false
    }
]

// Sample data for users
const USERS = [
    {
        id: 1,
        email: 'i@gmail.com',
        todos: [TODOS[0], TODOS[2]]
    },
    {
        id: 2,
        email: 'z@gmail.com',
        todos: [TODOS[2]]
    }
]

// Define the GraphQL schema
const typeDefs = gql`
type Todo {
    id: ID,
    name: String,
    completed: Boolean
}

type User {
    id: ID,
    email: String,
    todos: [Todo]
}

type Query {
    getAllTodos: [Todo],
    getTodoById(ids: [ID]): [Todo],
    getTodo(id: ID): Todo,
    getAllUsers: [User]
}
`

// Define the resolvers for the GraphQL schema
const resolvers = {
    Query: {
        // Resolver to get all todos
        getAllTodos: () => {
            return TODOS;
        },

        // Resolver to get a single todo by id
        getTodo: (_, args) => {
            return TODOS.find(todo => todo.id === args.id);
        },

        // Resolver to get multiple todos by a list of ids
        getTodoById: (_, args) => {
            return TODOS.filter(todo => args.ids.includes(todo.id));
        },

        // Resolver to get all users
        getAllUsers: () => {
            return USERS;
        }
    }
}

// Create a new ApolloServer object using the constructor
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

// Start the server and listen on the default port
server.listen().then(({ url }) => {
    console.log(`GraphQL server is running at ${url}`);
})
