import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const roll = () => Math.floor(6 * Math.random()) + 1;

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'World',
    },
    diceRoll: {
      type: new GraphQLList(GraphQLInt),
      args: {
        count: {
          type: GraphQLInt,
          defaultValue: 2,
        },
      },
      resolve: (_, args) => {
        let rolls = [];
        for (let i = 0; i < args.count; i++) {
          rolls.push(roll());
        }
        return roll;
      },
    },
    usersCount: {
      type: GraphQLInt,
      resolve: async (_, args, { mongoClient: client }) => {
        await client.connect();
        console.log('connected successfully');

        const collection = client.db('myFirstDatabase').collection('users');
        const count = await collection.estimatedDocumentCount();

        return count;
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery });
