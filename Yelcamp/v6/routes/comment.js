var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    campground  = require("../models/camp"),
    comment     = require("../models/comment");


 router.get("/new",isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log("err");
        }else{
                res.render("new_comment",{campground:camp});           
        }
    });
 
});

 router.post("/",isLoggedIn,function(req,res){
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

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }res.redirect("/login");
}
module.exports = router;
