const express = require("express");
const router = express.Router();
const checkAuth = require ('../middleware/checkAuth');
const Post = require('../db/post');
const User = require('../db/model');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

router.post('/add-post', checkAuth, async(req, res) => {
    const {title, content} =req.body;
    const newPost = new Post({ title, content, postedBy: req.user});
try {
    await newPost.save()
    res.status(201).json({
        status: 'Success',
        data: {
            newPost
        }
    }) 
    
} catch (error) {
    console.log(error);
    res.status(500).json({status: 'Failed', message:'invalid token'})
}
})

router.get('/post/:id', async(req, res) => {
    let myquery = {_id: objectId(req.params.id)};
    
    Post.findById(myquery, function (err, result) {
        if(err) throw err;
        res.json(result);
    }) 
})


// Route to get all posts
router.get('/get-post',  async(req, res) => {
        Post.find({}, function(err, posts) {
            if(err) throw err;
            res.json(posts);
        })
})

// Route to get  posts posted By the loggedin user
router.get('/mypost', checkAuth,  function (req, res) {
    myquery = {postedBy: objectId(req.user)}
    // console.log(myquery);

    Post.find(myquery, function (err, posts) {
        if (err) throw err;
        res.json(posts);
        // console.log(posts);
            
    })
    
})


router.post('/update-post/:id', checkAuth, (req, response) => {
    
    let myquery = {_id: objectId( req.params.id)};
    let newvalues = {
        $set: {
            title: req.body.title,
            content: req.body.content,
        },
    }
    Post.findOne(myquery).populate('postedBy','_id')
    .exec((err,post)=>{
        if(err || !post) {
            return response.status(422).json({error:err})
        }

        if(post.postedBy._id.toString() === req.user){
            // console.log(post.postedBy._id.toString());
            // console.log(req.user);
            Post.findOneAndUpdate(myquery, newvalues, function (err, res){
                if(err) throw err;
                console.log('1 document updated');
                response.json(res);
            }) 
        }  else {
            response.status(500).json({status: 'error', message: 'unauthorized'})
        }
    })

    
})

// This section will help you delete a record
router.delete('/delete-post/:id', checkAuth, (req, res) => {
let myquery = {_id: objectId(req.params.id)};
Post.findOne(myquery).populate('postedBy','_id')
.exec((err,post)=>{
    if(err || !post) {
        return res.status(422).json({error:err})
    }

    if(post.postedBy._id.toString() === req.user){
        Post.findByIdAndDelete(myquery, function (err, obj) {
            if(err) throw err;
            console.log('1 document deleted');
            res.json(obj);
            // console.log(obj);
        })
    }  else {
        res.status(500).json({status: 'error', message: 'unauthorized'})
    }
})
})
    
module.exports = router;