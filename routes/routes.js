const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const fs = require("fs");
const blog = require('../model/post');
const category = require('../model/categories');
const router = express.Router();



router.get('/' , (req,res)=>{

    blog.find({}).then((result)=>{
        console.log(result);
        res.render('home' , {result:result});
    }).catch((err)=>{
        res.render('error');
    })

})
router.get("/edit/:postId", function(req,res){
    const requestedPostId = req.params.postId;
    
    blog.findOne({_id: requestedPostId}, function(err, post){
        res.render("edit", {
        title: post.title,
        content: post.content
    });
  });
})
router.post("/edit/:postId", function(req,res){
    const requestedPostId = req.params.postId;
    
    blog.findByIdAndUpdate(requestedPostId, {title: req.body.title, content: req.body.content}, function(err,docs){
        if(err){
            console.log(err);
        }else{
           res.redirect('/');
        }
    })
})

router.get("/posts/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
    blog.findOne({_id: requestedPostId}, function(err, post){
        res.render("post", {
        title: post.title,
        content: post.content
    });
  });
    
});

router.get('/contact' , (req,res)=>{

    res.render('contact');

})

router.get('/about' , (req,res)=>{

    res.render('about');

})

router.get('/compose' , (req,res)=>{


    category.find({}).then((result)=>{
      
        res.render('compose' , {result:result});
    }).catch((err)=>{
        res.render('error');
    })
  

})

router.post('/compose' , (req,res)=>{

    category.findOne({name : req.body.category}).then((result1)=>{
      

        const hPost = new blog({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            color: result1.color,
            date:new Date().toISOString().slice(0, 10),
          });
        
    
          hPost.save()
          .then((result)=>{
            res.redirect("/");
          })
          .catch((err) => {
              console.log('error' , err);
          })
    }).catch((err)=>{
        res.render('error');
    })

    

})

router.get('/add_category' , (req,res)=>{

    res.render('add_category');

})


router.post('/add_category' , (req,res)=>{    

    const newCat = new category({
        name: req.body.name,
        color: req.body.color,
        date:new Date().toISOString().slice(0, 10),
      });
    

      newCat.save()
      .then((result)=>{
        res.redirect("/");
      })
      .catch((err) => {
          console.log('error' , err);
      })

})

router.get('/categories' , (req,res)=>{

    category.find({}).then((result)=>{
        console.log(result);
        res.render('categories' , {result:result});
    }).catch((err)=>{
        res.render('error');
    })

})

router.get("/delete/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
    blog.remove({_id: requestedPostId}, function(err, post){
        res.redirect('/')
  });
    
});

router.get("/category_posts/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
    blog.find({category: requestedPostId}, function(err, post){
        res.render("category_post", {
        result:post
    });
  });
    
});

router.get("/move_to_bucket/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
    category.find({}, function(err, post){
        res.render("move_to",{result:post});
  });
    
});


router.get("/move_group", function(req, res){

    const requestedPostId = req.params.postId;
    
    category.find({}, function(err, post){
        blog.find({}, function(err, post2){
            res.render('move_group', {categories:post , data:post2})
        });
  });
    
});

router.post("/move_group", function(req, res){

   var posts = req.body.blogs
   var categories = req.body.category

   category.findOne({name:categories}, async function(err, post){
    
            posts.forEach(async (postID) => {
                await blog.findByIdAndUpdate(postID, {category: categories, color : post.color}, function(err,docs){
                    if(err){
                        console.log(err);
                    }
                })
            })

   }).then((data) => {
        res.redirect('/')
   }).catch((err) => {

   })
   ;
    
});


router.post("/move_to_bucket/:postId", function(req, res){

    const requestedPostId = req.params.postId;

    category.findOne({name:req.body.category}, function(err, post){
        blog.findByIdAndUpdate(requestedPostId, {category: req.body.category, color : post.color}, function(err,docs){
            if(err){
                console.log(err);
            }else{
               res.redirect('/');
            }
        })
  });
    
    
    
});

router.get("/delete_category/:postId", function(req, res){

    const name = req.params.postId;
    
    category.remove({name:name}, function(err, post){
        blog.remove({category: name}, function(err, post){
            res.redirect('/')
      });
  });
    
});




module.exports = router;




















