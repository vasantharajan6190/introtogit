var express     = require("express"),
    app         = express(),
    bodyparser  =require("body-parser"),
    mongoose    =require("mongoose"),
      seedDB = require("./seed"),
      comment =require("./models/comment");
    mongoose.connect("mongodb://localhost/yelpcamp",{ useNewUrlParser: true });
  
    seedDB();
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));
 
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

app.get("/campground",function(req,res){
   campground.find({},function(err,allcamp){
       if(err)
       {
           console.log("Err");
       }
       else{
           res.render("index",{camp:allcamp});
       }
   });
    
});

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

app.get("/campground/new",function(req,res){
   res.render("new"); 
});

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

app.get("/campground/:id/comments/new",function(req,res){
    campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log("err");
        }else{
                res.render("new_comment",{campground:camp});           
        }
    });
 
});

app.post("/campground/:id/comments",function(req,res){
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

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Yelpcamp server started"); 
});