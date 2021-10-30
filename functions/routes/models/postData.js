const connection = require('./../../connect')

const postCollection = async (params, req) => {
    const { client } =  await connection()
    try {
        await client.connect();
        const database = client.db(params.dbName);
        const col = database.collection(params.collectionName);
        
        const data = await col.insertOne({
            img: req.file,
            category: req.body.category,
            price: req.body.price,
            title: req.body.title,
            color: req.body.color,
            description: req.body.description,
            exclusive: req.body.exclusive,
            createdAt: new Date()
        })
        if (!data) throw new Error('Upload Failed')

        return { message: `Product (${req.body.title}) posted successfully` }
    } 
    catch(err) {
        return err;
    }
}

module.exports = postCollection