const connection = require('./../../connect')
const mongodb = require('mongodb')

const getCollection = async (params) => {
    const { client } =  await connection()
    try {
        await client.connect();
        const database = client.db(params.dbName);
        const col = database.collection(params.collectionName);
        
        const data = col.findOne({ _id : new mongodb.ObjectId(params.productId) })
        if (!data) throw new Error('No Data Found')

        return data
    } 
    catch(err) {
        return err;
    }
}

module.exports = getCollection