const express = require('express')
const app = express()
const port = 5500

// require dor env
require('dotenv').config()

// middleware
const cors = require('cors')
app.use(cors())
app.use(express.json())


// connect mongoDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.szke7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function connect() {
    await client.connect() ? console.log('Connected to MongoDB') : console.log('Error connecting to MongoDB');
    const collection = client.db("shop").collection("products");

    // get api 
    app.get('/api/products', async (req, res) => {
        const products = await collection.find({}).toArray();
        res.send(products);
    })


}
connect().catch(console.dir);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))