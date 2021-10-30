const connection = async () => {
    const { MongoClient } = require('mongodb');

    const uri = "mongodb+srv://Helixcoders:industrialchemistry@spikedb.avwhy.mongodb.net/HONEYSPLACEDB?retryWrites=true&w=majority";

    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    return { client }
}

module.exports = connection