const express = require('express');
const app = express();
const postRoutes = express.Router();

let Post = require('../models/Post');

postRoutes.route('/add').post(function(req, res){

    let post = new Post(req.Body);
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

postRoutes.route('/edit/:id').get(function(req,res){
    Post.findById(req.param.id, function(err, next, post){
        if(!post){
            return next(new Error('Could not load'));
        }else{
            post.id = req.body.id;
            post.title = req.body.title;
            post.shortDescription = req.body.shortDescription;
            post.description = req.body.description;
            post.publishedAt = req.body.publishedAt;
            post.category = req.body.category;
            post.image = req.body.image;
            post.comments = req.body.comments;

            post.save().then(post =>{
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send('unable to update the database');
            });
        }
    });
});

postRoutes.route('/delete/:id').get(function(req, res){
    Post.findByIdAndRemove({_id: req.param.id}, function(err, post){
        if(err) res.json(err)
        else res.json('Successfully removed');
    });
});
module.exports = postRoutes;