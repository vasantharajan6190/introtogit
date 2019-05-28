var mongoose = require("mongoose");
var campground = require("./models/camp");
var comment = require("./models/comment");
var data = [{
    name: "United States",
    img : "http://under30ceo.com/wp-content/uploads/2010/08/SNF13TR02SA_371512a-e1280886572883.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
{
   name: "Russia",
   img: "https://image.cnbcfm.com/api/v1/image/104339946-GettyImages-551755655.jpg?v=1534239999&w=590&h=392",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  
},
{
     name: "Brazil",
     img: "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2012/08/11/7e/cities-best-architecture_ss_001.rend.hgtvcom.966.725.suffix/1491580968138.jpeg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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