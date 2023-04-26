const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json());

// Environment Variable 
require('dotenv').config();


// Mongodb Connection ---- >>> 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k8emzbd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const productCollection = client.db('emaJhon').collection('products')

        // Create API
        app.get('/products', async(req, res) => {
            // For get All Data from DB
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {}
            const cursor = productCollection.find(query)
            const products = await cursor.skip(page*size).limit(size).toArray();
            const count = await productCollection.estimatedDocumentCount();
            res.send({count,products})

        })

        // Get Request >>>> 
        app.post('/productsByIds', async(req, res) => {
            const ids = req.body;
            const objectIds = ids.map(id => ObjectId(id))
            const query = {_id : {$in : objectIds}};
            const cursor = productCollection.find(query);
            const product = await cursor.toArray();
            res.send(product);
        })
    }
    catch{}
}

run().catch(err => console.log(err))








app.get('/', (req, res) =>{
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`Server is Running On ${port}`)
})