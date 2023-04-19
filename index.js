const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors())
app.use(express.json())
require('dotenv').config()


const uri = `mongodb+srv://${process.env.PHOTOGRAPHY}:${process.env.PASSWORD}@cluster0.mdunt9i.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const userCollection = client.db('photography').collection('allusers')
        const productsCollection = client.db('photography').collection('allproducts')


        
        app.post('/allusers', async(req,res)=>{
                const buyerBooking = req.body
                console.log(buyerBooking);
                const result = await userCollection.insertOne(buyerBooking)
                res.send(result)
            })

        app.get('/allusers', async(req, res) => {
            const query = {}
            const cursor = userCollection.find(query)
            const service = await cursor.toArray()
            res.send(service)
        })
        app.get('/allusers/:role', async(req,res)=> {
            const role = req.params.role;
            const query = {role}
            const user = await userCollection.findOne(query);
            res.send(user)
        })
        app.get('/allproducts', async(req, res) => {
            const query = {}
            const cursor = productsCollection.find(query)
            const service = await cursor.toArray()
            res.send(service)
        })
        app.get('/allproducts/:id', async (req,res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const service = await productsCollection.findOne(query)
            res.send(service)
        })

      

    }
    finally{

    }
}
run().catch(error => console.error(error))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))