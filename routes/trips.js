var express = require("express");
var router = express.Router();
var Trip = require("../db_trips");
//INDEX ROUTE
router.get("/trips",function(req,res){
    var trips =[];
    Trip.find({},function(err,ans){
       if(!err){
           trips = ans;
           res.render('trips/trips',{trips:trips});
       }
    });
   
});

//CREATE ROUTE (POST REQUEST)
router.post("/trips", isLoggedIn, function(req,res){
   //CREATING NEW TRIP OBJECT TO STORE INTO DATABSE
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newTrip = {
        place: req.body.place,
        img: req.body.image,
        description:req.body.desc,
        author:author,
        cost: req.body.cost
    };
   // console.log(req.user);
  //  newTrip.author.id = req.user._id;
    //newTrip.author.username = req.user.username;
    // ADDING NEW TRIP TO THE DATABASE
    Trip.create(newTrip,function(err,ans){
        if(!err){
            res.redirect("/trips");
        }
    });
   
});

router.get("/trips/new", isLoggedIn, function(req,res){
   res.render("trips/new"); 
});

//SHOW ROUTE
router.get("/trips/:id",function(req,res){
   // var id = req.params.id;
    //console.log(id);
    var trip ={};
    Trip.findById(req.params.id).populate("comments").exec(function(err,ans){
       if(!err){
           //console.log(ans);
           trip = ans;
           res.render("trips/show",{trip:trip});
       } 
    });
   //res.send("this is show route and id = " +id); 
});
function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router