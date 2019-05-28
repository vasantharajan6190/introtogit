var mongoose = require("mongoose");
var campground = require("./models/camp");
var comment = require("./models/comment");
var data = [{
    name: "something",
    img : "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description: "Hi this is the first added "
},
{
   name: "something",
    img : "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description: "Hi this is the first added "  
},
{
     name: "something",
     img :"https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    description: "Hi this is the first added "
}
];
function seedDB(){
    
campground.remove({},function(err){
    if(err)
    {
        console.log(err);
    }
    console.log("removed successfully");
    data.forEach(function(data){
        campground.create(data,function(err,newdata){
            if(err){
                console.log(err);
            }else{
                console.log("newly created");
                comment.create({
                    text: "Jungle book",
                    author: "vasanth"
                },function(err,comment){
                    if(err){
                        console.log(err);
                    }else{
                        newdata.comment.push(comment);
                    newdata.save();
                    console.log("New comment is created");
                    }
                    
                });
            }
        });
    });
});
};
module.exports = seedDB;