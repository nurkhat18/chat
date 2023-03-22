/*
  Name: Nurkhat Jumabaev
  Course Name: CSc337
  Description: this is server side code for 
  chatty project using nodejs.

*/

// importing needed modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// connecting database to the server
mongoose.set('strictQuery', true);
const connection_string = "mongodb+srv://jumabaevnurxat18:xJ2uFjDT5HvXDoCy@cluster0.gq9oyqr.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_string, {useNewUrlParser:true});
mongoose.connection.on('error', () => {
  console.log('error');
})

// creating a template for our data
const userSchema = new mongoose.Schema({
  time: Number,
  alias: String,
  messages: String
})

const User = mongoose.model('User', userSchema);

app.use(express.static('public_html'));

// Parse incoming JSON data with the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + "/public_html"));

app.get('/', (req, res) =>{
  res.end("hello 1");
})

app.post('/post', (req, res) => {
  // creating a document in the collection
  User.create({ time: Date.now(), alias: req.body.alias, messages: req.body.message});
  
})

app.get('/display', async (req, res) => {
  // getting all the documents from collection
  const messages = await User.find().sort('time');
  // sending to the client side
  res.json(messages);
  

})

app.listen(3000, ()=>{
  console.log('server is running')
})
