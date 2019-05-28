var express       = require("express"),
    app           = express(),
    bodyparser    = require("body-parser"),
    passport      = require("passport"),
    passportlocal = require("passport-local"),
    mongoose      = require("mongoose"),
      seedDB      = require("./seed"),
      comment     = require("./models/comment"),
      user        = require("./models/user");
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
 //schema setup
 
 var campground = require("./models/camp");
//   campground.create({
//      name:"hat",
//      img:"https://c.ndtvimg.com/2019-03/9r23f9hg_happy-holi-status_625x300_19_March_19.jpg",
//      description: "this is the content u clicked unknownly and u have to re download it by reading this u will be confusedf"
//  },function(err,campground){
//      if(err)
//      {
//          console.log("Err");
//      }
//      else
//      {
//          console.log("Added"+" "+campground);
//      }
//  });
 
app.get("/",function(req,res){
   res.render("home"); 
});
//index route
app.get("/campground",function(req,res){
   campground.find({},function(err,allcamp){
       if(err)
       {
           console.log("Err");
       }
       else{
           res.render("index",{camp:allcamp,currentUser:req.user});
       }
   });
    
});
//new route
app.post("/campground",function(req,res){
    var name=req.body.name;
        var image=req.body.image;
        var newone = {name:name,img:image};
        campground.create(newone,function(err,newone){
           if(err)
           {
               console.log("err");
           }
           else{
                       res.redirect("/campground");
           }
        });

});
//create route
app.get("/campground/new",function(req,res){
   res.render("new"); 
});
//show route
app.get("/campground/:id",function(req,res){
    campground.findById(req.params.id).populate("comment").exec(function(err,result){
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(result);
            res.render("show",{res:result});
        }
    });
    
});
//comment route
app.get("/campground/:id/comments/new",isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log("err");
        }else{
                res.render("new_comment",{campground:camp});           
        }
    });
 
});

app.post("/campground/:id/comments",isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
        }else{
            comment.create(req.body.commentof,function(err,commentans){
                if(err){
                    console.log("err");
                }else{
                    camp.comment.push(commentans);
                    camp.save();
                    res.redirect("/campground/"+camp._id);
                }
            });
        }
    });
});


//Auth routes
//register form
app.get("/register",function(req,res){
   res.render("register"); 
});
//register post request
app.post("/register",function(req,res){
    var newUser = new user({username:req.body.username});
    user.register(newUser,req.body.password,function(err,data){
        if(err){
            console.log("err");
            return res.render("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campground");
        });
    });
});
//login form
app.get("/login",function(req,res){
    res.render("login");
});
//login logic
app.post("/login",passport.authenticate("local",
{
         successRedirect: "/campground",
         failureRedirect: "/login"
}),function(req,res){
});
//logout
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campground");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }res.redirect("/login");
}

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Yelpcamp server started"); 
});