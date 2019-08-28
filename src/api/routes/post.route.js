const express = require('express');
const app = express();
const postRoutes = express.Router();

let Post = require('../models/Post');

postRoutes.route('/add').post(function(req, res){ 
    let post = new Post(req.body);
    post.save()
    .then(post => {
        res.status(200).json({'post': 'post in added succesfully'});
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

postRoutes.route('/').get(function(req, res){

    Post.find(function(err, post){
        if(err){
            console.log(err);
        }else{
            res.json(post);
        }
    })
});

postRoutes.route('/edit/:id').post(function(req,res){
    console.log('start');
    debugger;
    console.log('breakpoint');
    var filter ={ "id": req.body.id}; 
    Post.findOneAndUpdate(filter, {"$set":{ "title" : req.body.title,
    "shortDescription": req.body.shortDescription,
    "description": req.body.description,
    "publishedAt": req.body.publishedAt,
    "category": req.body.category,
    "image": req.body.image,
    "comments": req.body.comments}},(err, writeResult)=> {}); 
});

postRoutes.route('/delete/:id').get(function(req, res){
    Post.findByIdAndRemove({_id: req.param.id}, function(err, post){
        if(err) res.json(err)
        else res.json('Successfully removed');
    });
});
module.exports = postRoutes;