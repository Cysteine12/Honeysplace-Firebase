const connection = require('./../../connect')
const mongodb = require('mongodb')

const deleteCollection = async (params) => {
    const { client } =  await connection()
    try {
        await client.connect();
        const database = client.db(params.dbName);
        const col = database.collection(params.collectionName);
        
        col.deleteOne({ _id : new mongodb.ObjectId(params.productId) })

        return;
    } 
    catch(err) {
        return err;
    }
}

module.exports = deleteCollection