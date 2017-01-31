const express = require('express');
const bodyParser = require('body-parser');





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

app.get('/monsters', (req, res) => {
  res.send(monsters);
});

app.post('/monsters', (req, res) => {
  const newMonster = req.body;

  newMonster.id = monsters.length;

  monsters.push(newMonster);

  res.send(newMonster);
});

app.use(function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const server = app.listen('7070', function(){
  console.log("The server is running in port" + server.address().port )
});









