const express = require('express')
const app = express();
const { MongoClient, ServerApiVersion, ExplainVerbosity, ObjectId  } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2grod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
     await client.connect();
    const serviceCollection= client.db('toolsService').collection('service')
    
    const orderCollection= client.db('toolsService').collection('orderService')
    

    app.get('/service',async(req,res)=>{
        const service = await serviceCollection.find().toArray();
        res.send(service)
    });
   app.get('/service/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const query = { _id: ObjectId(id) };
    console.log(query);
    const service = await serviceCollection.findOne(query);
    res.send(service);
   })


    //  orderCollection
   app.post('/orders', async (req, res) => {
    const orders = req.body;
    
    const result = await orderCollection.insertOne(orders);
     res.send(result)
  })
  app.get('/orders' ,async(req,res)=>{
    const orders = await orderCollection.find().toArray();
    res.send(orders)
  })
  app.delete('/orders/:id', async (req, res) => {
    const id = req.body.id;
 
    const query = { _id: ObjectId(id) };
    const result = await orderCollection.deleteOne(query);
    res.send(result);
    // res.send(id)
});
    }
    finally{

    }

}

run().catch(console.dir)
app.get('/',(req,res)=>{
    res.send('from server uncle')
})
app
app.listen(port,()=>{
    console.log('example app listeinig on port ');
})