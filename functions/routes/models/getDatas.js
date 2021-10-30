const connection = require('./../../connect')

const getCollections = async (params) => {
    const { client } =  await connection()
    try {
        await client.connect();
        const database = client.db(params.dbName);
        const col = database.collection(params.collectionName);
        
        const data = col.find({}).toArray()
        if (!data) throw new Error('No Data Found')

        return data
    } 
    catch(err) {
        return err;
    }
}

module.exports = getCollections