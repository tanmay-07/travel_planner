
//  IMPORTING PACKAGES
var bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    express    = require('express'),
    app        = express(),
    Trip       = require("./db_trips"),
    Comment    = require("./db_comments"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    User         = require("./user");
    seedDB       = require("./seed");
    
var tripRoutes = require("./routes/trips"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

//PASSSPORT CONFIG

app.use(require("express-session")({
    secret:"Learing Authentication",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    
//APP CONFIG    
app.use(express.static(__dirname + '/public'));
mongoose.connect("mongodb://localhost/travel_planner");
app.use(bodyParser.urlencoded({extended:true}));  
app.use(bodyParser.json());
app.set("view engine", "ejs");

seedDB(); //seeding data to databse

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next(); 
});


//ROUTES
app.use(indexRoutes);
app.use(commentRoutes);
app.use(tripRoutes);
//STARTING SERVER

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("TRAVEL PLANNER is running..!"); 
});
