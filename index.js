const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r6wv8dh.mongodb.net/?retryWrites=true&w=majority`;

// console.log('database url',uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {
        const contactsCollection = client.db("contacts-management").collection("contacts");
        const favouritesCollection = client.db("contacts-management").collection("favourites");



        app.post('/contact', async (req, res) => {
            const contact = req.body;
            const result = await contactsCollection.insertOne(contact);
            res.send(result);
        });
        app.get('/contact', async (req, res) => {
            const query = {};
            const result = await contactsCollection.find(query).toArray();
            res.send(result);
        });

        // Delete contact
        app.delete('/contact/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await contactsCollection.deleteOne(query);
            res.send(result);
        });

        // Add favourites contact
        app.post('/favourite', async (req, res) => {
            const favourite = req.body;
            const result = await favouritesCollection.insertOne(favourite);
            res.send(result);
        });

        app.get('/favourite', async (req, res) => {
            const query = {};
            const result = await favouritesCollection.find(query).toArray();
            res.send(result);
        });

        // Update
        // app.put('/contact/:id', async (req, res) => {

        //     const id = req.params.id;
        //     const filter = { _id: new ObjectId(id) }

        //     const result = await contactsCollection.updateOne(filter);
        //     res.send(result);
        // });




    }
    finally {

    }

}
run().catch(error => console.log(error))




app.get('/', async (req, res) => {
    res.send('server is rinnong.....');
});

app.listen(port, () => console.log(`running on ${port}`));