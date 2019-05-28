var express    = require("express"),
    flash      = require("connect-flash"),
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
                       req.flash("success","Succesfully Created A New Camp");
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
//edit route
router.get("/:id/edit",checkuser,function(req,res){
     campground.findById(req.params.id,function(err,found){
             res.render("edit",{found:found});
     });
});
//update route
router.put("/:id", checkuser,function(req,res){
    campground.findByIdAndUpdate(req.params.id,req.body.body,function(err,newdata){
        if(err){
            res.redirect("/campground");
        }else{
            req.flash("success","Succesfully Updated");
            res.redirect("/campground/"+req.params.id);
        }
    });
});
//delete
router.delete("/:id", checkuser,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err,found){
        if(err){
            res.redirect("/campground");
        }else{
            req.flash("success","Succesfully Deleted");
            res.redirect("/campground");
        }
    });
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please log in First");
    res.redirect("/login");
}
function checkuser(req,res,next){
    if(req.isAuthenticated()){
        campground.findById(req.params.id,function(err,found){
            if(err){
                req.flash("error","campground not found");
                res.redirect("back");
            }else{
                if(found.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You Don't Have The Permission");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","Please log in First");
        res.redirect("back");
    }
}

module.exports = router;