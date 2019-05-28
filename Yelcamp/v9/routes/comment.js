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
                    //add username and id to comment
                    commentans.author.id = req.user._id;
                    commentans.author.username = req.user.username;
                    //save comment
                    commentans.save();
                    camp.comment.push(commentans);
                    camp.save();
                    res.redirect("/campground/"+camp._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit",checkusercomment,function(req,res){
    comment.findById(req.params.comment_id,function(err,found){
        if(err){
            res.redirect("back");
        }else{
            res.render("editcomment",{campgroundid:req.params.id,comment:found});    
        }
    });
    
});
router.put("/:comment_id",checkusercomment,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.commentof,function(err,found){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campground/"+req.params.id);
        }
    });
});

//delete comment
router.delete("/:comment_id",checkusercomment,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err,found){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campground/"+req.params.id);
        }
    });
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }res.redirect("/login");
}

function checkusercomment(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,found){
            if(err){
                res.redirect("back");
            }else{
                if(found.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}

module.exports = router;
