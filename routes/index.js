var express = require("express");
var router = express.Router(),
 passport   = require("passport"),
 User         = require("../user");

//  ROOT ROUTE
router.get("/",function(req,res){
   res.redirect('/trips');
});

//CONTACT US PAGE ROUTE
router.get("/contact", function(req,res){
   res.render("contact"); 
});
//ABOUT PAGE ROUTE
router.get("/about", function(req, res){
   res.render("about"); 
});

//==============
// AUTH ROUTES
//==============

//REGISTER ROUTE
router.get("/register",function(req, res){
   res.render("register"); 
});

//handle sign up
router.post('/register', function(req, res) {
      User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
          if (err) {
            return res.render("register");
          }

          passport.authenticate('local')(req, res, function () {
            res.redirect('/trips');
          });
      });
});

//LOGIN ROUTES
router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/trips",
        failureRedirect:"/login"
        
    }), function(req, res){
});

// LOGOUT ROUTE
router.get("/logout",function(req,res){
   req.logout();
   res.redirect("/trips");
});

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router