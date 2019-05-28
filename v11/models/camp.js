var mongoose = require("mongoose");
 var campgroundschema = new mongoose.Schema({
     name:String,
     price: String,
     img:String,
     description: String,
     author:{
      id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "user"
      },
      username :String
     },
     comment:[{
      type: mongoose.Schema.Types.ObjectId,
      ref : "comment"
     }]
 });

module.exports = mongoose.model("campground",campgroundschema);
