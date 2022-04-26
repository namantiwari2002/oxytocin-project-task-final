const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({

    title:String,
    content: String,
    category: String,
    color: String,
    date:String,


})

const Post = mongoose.model('post' , postSchema);

module.exports = Post;