var express = require("express");
var router = express.Router();
var Trip = require("../db_trips"),
Comment    = require("../db_comments");
//=====================
//COMMENT ROUTES
//=====================

router.get("/trips/:id/comments/new", isLoggedIn, function(req,res){
    Trip.findById(req.params.id,function(err,ans){
        if(!err){
           // console.log(ans);
            res.render("comments/new", {trip:ans});           
        }
    });
   
});

router.post("/trips/:id/comments", isLoggedIn, function(req, res){
   
   Trip.findById(req.params.id,function(err,trip){
       if(!err){
           
           Comment.create(req.body.comment,function(err,comment){
               if(!err){
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   trip.comments.push(comment);
                   
                   trip.save();
                   res.redirect("/trips/"+trip._id);
               }
           });
           
       }
   }) ;
});
function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router