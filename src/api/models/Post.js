const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
    id: { type: Number },
    title: { type: String },
    shortDescription: { type: String },
    description: { type: String },
    publishedAt: { type: String },
    category: { type: String },
    image: { type: String },
    comments: { type: [String] }
},{
    collection: 'post'
});

module.exports = mongoose.model('Post', Post);