
//  IMPORTING PACKAGES
var bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    express    = require('express'),
    app        = express(),
    Trip       = require("./db_trips"),
    Comment    = require("./db_comments"),
    seedDB       = require("./seed");
    
//APP CONFIG    
app.use(express.static(__dirname + '/public'));
mongoose.connect("mongodb://localhost/travel_planner");
app.use(bodyParser.urlencoded({extended:true}));  

app.set("view engine", "ejs");

seedDB();

//ROUTES
//  ROOT ROUTE
app.get("/",function(req,res){
   res.redirect('/trips');
});
//INDEX ROUTE
app.get("/trips",function(req,res){
    var trips =[];
    Trip.find({},function(err,ans){
       if(!err){
           trips = ans;
           res.render('trips/trips',{trips:trips});
       }
    });
   
});

//CREATE ROUTE (POST REQUEST)
app.post("/trips",function(req,res){
   //CREATING NEW TRIP OBJECT TO STORE INTO DATABSE
    var newTrip = {
        place: req.body.place,
        img: req.body.image,
        cost: req.body.cost
    };
    // ADDING NEW TRIP TO THE DATABASE
    Trip.create(newTrip,function(err,ans){
        if(!err){
            res.redirect("/trips");
        }
    });
   
});

app.get("/trips/new",function(req,res){
   res.render("new"); 
});

//SHOW ROUTE
app.get("/trips/:id",function(req,res){
    var id = req.params.id;
    console.log(id);
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
//CONTACT US PAGE ROUTE
app.get("/contact", function(req,res){
   res.render("contact"); 
});
//ABOUT PAGE ROUTE
app.get("/about", function(req, res){
   res.render("about"); 
});
//=====================
//COMMENT ROUTES
//=====================

app.get("/trips/:id/comments/new",function(req,res){
    Trip.findById(req.params.id,function(err,ans){
        if(!err){
            console.log(ans);
            res.render("comments/new", {trip:ans});           
        }
    })
   
});

app.post("/trips/:id/comments",function(req, res){
   
   Trip.findById(req.params.id,function(err,trip){
       if(!err){
           Comment.create(req.body.comment,function(err,comment){
               if(!err){
                   trip.comments.push(comment);
                   trip.save();
                   res.redirect("/trips/"+trip._id);
               }
           })
           
       }
   }) ;
});
//STARTING SERVER

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("TRAVEL PLANNER is running..!"); 
});
