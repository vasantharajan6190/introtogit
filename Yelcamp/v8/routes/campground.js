var express    = require("express"),
    router     = express(),
    campground = require("../models/camp");


router.get("/",function(req,res){
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
router.post("/",isLoggedIn,function(req,res){
    var name=req.body.name;
        var image=req.body.image;
        var description=req.body.description;
        var author = {
         id:req.user._id,
         username:req.user.username
        };
        var newone = {name:name,img:image,description:description,author:author};
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
router.get("/new",isLoggedIn,function(req,res){
   res.render("new"); 
});
//show route
router.get("/:id",function(req,res){
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
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }res.redirect("/login");
}
module.exports = router;