const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Schema = mongoose.Schema;

const monsterSchema = new Schema({
  nickname: {type: String, required: true},
  type: String
});

const Monster = mongoose.model('Monster', monsterSchema);





    const monsters = [
  {
    nickname: "Jersey Devil",
    type: "American",
    id:0
  },
  {
    nickname: "Kolokoy",
    type: "Philippine",
    id:1
  },
  {
    nickname: "Lochness",
    type:"Scottish",
    id:2
  },
  {
    nickname: "Butch",
    type:"'Murican",
    id:3
  },
  {
    nickname: "The Majestic",
    type:"Majestic",
    id:4
  }
];



const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



mongoose.Promise = global.Promise;
  try{
    mongoose.connect('mongodb://localhost/merning');
    console.log('connected to MongoDB!!!');
  } catch (e) {
    console.log('ERROR: was not able to connect to MongoDB. Check to see if it is running. To run MongoDB, run command, mongod');
    process.exit(1);
  }

app.use('/assets', express.static(path.resolve('merning2/assets'), {maxAge: '30 days'}));

app.get('/monsters', (req, res) => {
  Monster.find((err, monsters) => {
    if (err) return res.status(500).send(err);

    res.send(monsters);
  });
});

app.post('/monsters', (req, res) => {
  const newMonster = new Monster(req.body);

  newMonster.save((err, monster) => {
    if (err) return res.status(500).send(err);

    res.send(monster);
  });
});

app.use(function(req, res){
  res.sendFile(__dirname + '/assets/client.js');
});

const server = app.listen('7070', function(){
  console.log("The server is running in port" + server.address().port )
});









