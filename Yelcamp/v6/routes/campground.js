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
router.post("/",function(req,res){
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
router.get("/new",function(req,res){
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
module.exports = router;