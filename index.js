const mongoose = require('mongoose');
const express =  require('express');
const path = require('path');
const config = require('./config/database');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,{ useUnifiedTopology: true, useNewUrlParser: true  })
        .then(() =>console.log('Connected MongoDB'))
        .catch((error) =>console.log(error))

app.use(express.static(__dirname + '/client/dist/'))

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})

app.listen(8000, ()=> console.log('listening on 8000'))