import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URL_DEV ?? '';
export default new MongoClient(url);

/* const db = async () => {
  await client.connect();
  console.log('connected to db');

  return client.db('myFirstDatabase');
};

export default db; */
