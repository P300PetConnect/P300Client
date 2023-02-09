const express = require('express');
const router = express.Router();

const mongoTypes = require('mongoose').Types;
const Post = require('../Backend/Models/Post.js');


//routes
//get all posts
router.get('/',(req,res)=>{
    Post.find((err,doc) => {
        if(err) {
            console.log('Error occures while fetching data.' + err);
            res.status(400).send('Internal error',err);
        }else {
            res.send(doc);
        }
    })
})

// create new post
router.post('/',(req,res) => {
    let post = new Post({
        email : req.body.email,
        routeName  : req.body.routeName,
        startPoint : req.body.startPoint,
        endPoint : req.body.endPoint

    });

    post.save((err,doc) => {
        if(err) {
            console.log('Internal error : ', err);
            res.status(400).send('Internal Error :'+ err);
        }else {
            res.send(doc);
        }
    })

})

//get post by id
router.get('/:id',(req,res) => {
    if(mongoTypes.ObjectId.isValid(req.params.id)) {
        Post.findById(req.params.id , (err,doc) => {
            if(err) {
                console.log('Internal error',err);
                res.status(400).send('Internal error',err);
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(400).send('No record found with id :',id);
    }
})

//delete post by id
router.delete('/:id',(req,res) => {
    if(mongoTypes.ObjectId.isValid(req.params.id)) {
        Post.findByIdAndRemove(req.params.id , (err,doc) => {
            if(err) {
                console.log('Internal error',err);
                res.status(400).send('Internal error',err);
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(400).send('No record found with id :',id);
    }
})

//update post 
router.put('/:id',(req,res) => {

    let post = {
        email : req.body.email,
        routeName  : req.body.routeName,
        startPoint : req.body.startPoint,
        endPoint : req.body.endPoint
    }


    if(mongoTypes.ObjectId.isValid(req.params.id)) {
        Post.findByIdAndUpdate(req.params.id ,{$set : post},{new : true}, (err,doc) => {
            if(err) {
                console.log('Internal error',err);
                res.status(400).send('Internal error',err);
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(400).send('No record found with id :',id);
    }
})

module.exports = router;