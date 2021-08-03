const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

//student data
const student = ['jim', 'timothy', 'jimothy']

//endpoints
app.get('/', function(Req, res){
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/api/students', function(req, res){
    let {name} = req.body; 
    // console.log(name)

    const index = students.findIndex((student) => {
        return student === name
    
    })

    try {
        if (index === -1 && name !== "") {
          students.push(name);
          res.status(200).send(students);
        } else if (name === "") {
          res.status(400).send("must provide a name");
        } else {
          res.status(400).send("that student already exists");
        }
      } catch (err) {
        // do something
      }
})

const port = process.env.PORT || 5050;

app.listen(port, function() {
    console.log('Server rocking out on ${port}')
})