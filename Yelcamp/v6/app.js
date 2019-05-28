var express        = require("express"),
    app            = express(),
    bodyparser     = require("body-parser"),
    passport       = require("passport"),
    passportlocal  = require("passport-local"),
    mongoose       = require("mongoose"),
      seedDB       = require("./seed"),
      comment      = require("./models/comment"),
       user        = require("./models/user");
     //requiring routes  
 var campgroundRoutes  = require("./routes/campground"),
 commentRoutes     = require("./routes/comment"),
 indexRoutes       = require("./routes/index");
    mongoose.connect("mongodb://localhost/yelpcamp",{ useNewUrlParser: true });
  
    seedDB();
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
 //passport configuration
 app.use(require("express-session")({
     secret: "This is vasanth how are you",
     resave: false,
     saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new passportlocal(user.authenticate()));
 passport.serializeUser(user.serializeUser());
 passport.deserializeUser(user.deserializeUser());
 app.use(function(req,res,next){
     res.locals.currentUser = req.user;
     next();
 });
app.use("/campground",campgroundRoutes);
app.use(indexRoutes);
app.use("/campground/:id/comments",commentRoutes);
 //schema setup
 var campground = require("./models/camp");

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Yelpcamp server started"); 
});