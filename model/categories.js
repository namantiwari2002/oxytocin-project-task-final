const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categories = new Schema({

    name:String,
    color:String,
    date:String,

})

const Category = mongoose.model('Categories' , categories);

module.exports = Category;