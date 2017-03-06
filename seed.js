var mongoose = require("mongoose");
var Trip     = require("./db_trips");
var Comment  = require("./db_comments");
//DELETE ALL THE TRIPS

function seed(){
        Trip.remove(function(err,ans){
        if(!err){
            console.log("Removed all the trips!");
            // Trip.create()ADD RECORDS TO TRIPS DATABASE
            Trip.create({
                place:"Triund",
                img:"http://a2.images.thrillophilia.com/image/upload/s--pUW904LB--/c_fill,f_auto,fl_strip_profile,h_800,q_jpegmini,w_1300/v1/images/photos/000/095/991/original/1468391268_things-to-do-in-mcleodganj-triund-trek-camping-triund-trekking-2.jpg.jpg?1468391268",
                cost:3000
            },function(err,trip){
                if(!err){
                console.log("Added a new Trip!");
                Comment.create({
                    text:"This is a new comment!",
                    author:"Hathi"
                },function(err,ans){
                    if(!err){
                        trip.comments.push(ans);
                        trip.save();
                    }else{
                        console.log(err);
                    }
                });
                }
            });
        }
    });

}

module.exports = seed;