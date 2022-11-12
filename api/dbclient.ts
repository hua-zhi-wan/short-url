import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.DB_URI ?? '';
const dbclient = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1
});

export {
    dbclient
}