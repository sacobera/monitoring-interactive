const express = require('express');
const app = express();
const path = require('path');

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '7232065577b64649b76d19abebd65cad',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
// rollbar.log("Hello world!");


app.use(express.json());

//student data
const pet = ['Alfalfa', 'Kitty', 'Tucker']

// //bad endpoint for testing
// app.get('/', function(req, res){
//   res.path.join.(--dirnamee)
// })


//endpoints
app.get('/', function(Req, res){
    res.sendFile(path.join(__dirname, '/public/index.html'))
    
})

app.post('/api/pets', function(req, res){
    let {name} = req.body; 
    console.log(name)

                  //array name.findIndex(call it pet)
    const index = pet.findIndex((pet) => {
        return pet === name
    
    })

    try {
        if (index === -1 && name !== "") {
          pet.push(name);
          rollbar.info('A new pet is added!')
          res.status(200).send(pet);
        } else if (name === "") {
            rollbar.critical('Someone tried to enter a blank pet name')
          res.status(400).send("must provide a name");
          
        } else {
            rollbar.warning('Someone tried to enter a duplicate pet name')
          res.status(400).send("that pet already exists");
        }
      } catch (err) {
          console.log(err)
          rollbar.error(err)
        // do something
      }
})

const port = process.env.PORT || 5050;

app.listen(port, function() {
    console.log(`Server rocking out on ${port}`)
})