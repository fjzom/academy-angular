const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');
    cors = require('cors'),
    mongoose = require('mongoose')
    config = require('./DB')
    open = require('open')

    const postRoutes =  require('./routes/post.route');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, {useNewUrlParser: true}).then(
        ()=> {console.log('Database is connected')},
        err=> {console.log('Can not connect to the database '+ err)}
    )

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());  
    app.use('/something', postRoutes);
    let port = process.env.PORT || 3000;
    // main route

    const server = app.listen(port, function(err){
        if(err){
            console.log(err);
        }else{
            open('http://localhost:' + port);
        }
    })
    module.exports = app;