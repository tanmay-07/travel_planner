var mongoose = require("mongoose");

var tripsSchema = mongoose.Schema({
   place: String,
   img: String,
   cost: Number,
   description: String,
   author:{
       id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
       },
       username: String
   },
   comments:[
           {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
           }
       ]
});
//SETTING UP MONGOOSE MODEL
module.exports = mongoose.model("Trip", tripsSchema);
