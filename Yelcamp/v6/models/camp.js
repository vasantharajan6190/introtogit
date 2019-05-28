var mongoose = require("mongoose");
 var campgroundschema = new mongoose.Schema({
     name:String,
     img:String,
     description: String,
     comment:[{
      type: mongoose.Schema.Types.ObjectId,
      ref : "comment"
     }]
 });

module.exports = mongoose.model("campground",campgroundschema);
