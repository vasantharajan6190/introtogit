var express  = require("express"),
    router   = express(),
    user     = require("../models/user"),
    passport = require("passport");

router.get("/",function(req,res){
   res.render("home"); 
});

//register form
router.get("/register",function(req,res){
   res.render("register"); 
});
//register post request
router.post("/register",function(req,res){
    var newUser = new user({username:req.body.username});
    user.register(newUser,req.body.password,function(err,data){
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Succesfully Registered "+data.user);
            res.redirect("/campground");
        });
    });
});
//login form
router.get("/login",function(req,res){
    res.render("login");
});
//login logic
router.post("/login",passport.authenticate("local",
{
         successRedirect: "/campground",
         failureRedirect: "/login"
}),function(req,res){
});
//logout
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Successfully Logged out");
    res.redirect("/campground");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Log In First");
    res.redirect("/login");
}
module.exports = router;