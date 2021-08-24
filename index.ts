import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import schema from './schemas';
import mongoClient from './database';

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    context: { mongoClient },
  })
);

app.listen(process.env.PORT ?? 3000, () => console.log('server started'));
