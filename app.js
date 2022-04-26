const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public' , express.static('public'));

var port = process.env.PORT || 2100;

const blog = require('./model/post');
const category = require('./model/categories');

const dbUri = 'mongodb+srv://admin:admin@cluster0.rcfse.mongodb.net/highlights?retryWrites=true&w=majority';
mongoose.connect(dbUri , {userNewUrlParser : true , userUnifiedTopology : true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));



const Routes = require('./routes/routes');
app.use('/',Routes);


app.listen(port);