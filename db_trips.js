var mongoose = require("mongoose");

var tripsSchema = mongoose.Schema({
   place: String,
   img: String,
   cost: Number,
   comments:[
           {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
           }
       ]
});
//SETTING UP MONGOOSE MODEL
var Trip  = mongoose.model("Trip", tripsSchema);
module.exports = Trip;