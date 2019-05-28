var bodyparser  =  require("body-parser"),
    mongoose    =  require("mongoose"),
    methodover  =  require("method-override"),
    express     =  require("express"),
    app         =  express(); 

//app setup    
mongoose.connect("mongodb://localhost/blog",{ useNewUrlParser: true });    
app.set("view engine","ejs");
app.use(express.static("public"));  
app.use(methodover("_method"));
app.use(bodyparser.urlencoded({extended: true}));

//database model  
var blogSchema = new mongoose.Schema({
    title: String,
    image : String,
    body : String,
    created: {type: Date,default: Date.now}
});
var blog = mongoose.model("blog",blogSchema);

//Routes
//index route
app.get("/",function(req,res){
   res.redirect("/blog"); 
});

app.get("/blog",function(req,res){
    blog.find({},function(err,blog){
       if(err) 
       {
           console.log(err);
       }else
       {
           res.render("index",{blog:blog});    
       }
    });
});
//new
app.get("/blog/new",function(req,res){
    res.render("new");
});
//create
app.post("/blog",function(req,res){
  blog.create(req.body.blog, function(err,blogg){
      if(err)
      {
          res.render("new");
      }else//redirect
      {
          res.redirect("/blog");
      }
  });
});
//show
app.get("/blog/:id",function(req,res){
    blog.findById(req.params.id,function(err,blog){
        if(err)
        {
            res.render("/blog");
        }else{
             res.render("show",{blog:blog});
        }
    });
   
});
//edit
app.get("/blog/:id/edit",function(req,res)
{
    blog.findById(req.params.id,function(err,blog){
       if(err)
       {
           res.redirect("/blog");
       }else{
               res.render("edit",{blog:blog});
       }
    });
 //update   
    app.put("/blog/:id",function(req,res){
        blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,blog){
            if(err)
            {
                res.redirect("/blog");
            }
            else{
                res.redirect("/blog/"+req.params.id);
            }
        });
    });

});
//delete
app.delete("/blog/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id,function(err,blog)
    {
        if(err)
        {
            res.redirect("/blog");
        }else{
            res.redirect("/blog");
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server started"); 
});