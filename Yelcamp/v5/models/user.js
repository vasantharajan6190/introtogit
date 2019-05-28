var mongoose = require("mongoose");
var localmongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
UserSchema.plugin(localmongoose);
module.exports = mongoose.model("user",UserSchema);