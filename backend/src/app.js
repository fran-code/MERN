import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from "./graphql/schema";
import { connect } from './database';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './axios/routes/notes'
dotenv.config();

// Initializations
const app = express();
connect();

// Settings
app.set('port', process.env.PORT || 4000);
app.use(cors());

// GraphQl
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

// AXIOS
app.use(express.json());
// routes
app.use('/api/notes', router);

export default app;