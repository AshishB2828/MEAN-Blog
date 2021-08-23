const mongoose = require('mongoose');
const express =  require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors =  require('cors')


const config = require('./config/database');
const authentication = require('./routes/authentication')

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,{ useUnifiedTopology: true, useNewUrlParser: true  })
        .then(() =>console.log('Connected MongoDB'))
        .catch((error) =>console.log(error))


app.use(cors({
        origin: "http://localhost:4200"
}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/client/dist/client'))
app.use('/auth', authentication)
app.use('/user', require('./routes/userRouters'))


app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/client/dist/client/index.html'))
})

app.listen(8000, ()=> console.log('listening on 8000'))