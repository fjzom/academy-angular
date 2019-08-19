const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
    id: { type: Number },
    title: { tpye: String },
    shortDescription: { tpye: String },
    description: { tpye: String },
    publishedAt: { tpye: String },
    category: { tpye: String },
    image: { tpye: String },
    comments: { type: [String] }
},{
    collection: 'post'
});

module.exports = mongoose.model('Post', Post);