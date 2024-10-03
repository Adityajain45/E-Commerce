const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listeningSchema = new Schema({
    title: {
       type: String,
        required: true,
    },
    description:{
      type: String,
    },
    image:{
        url: String,
        filename: String,
    },  
    price:{
        type: Number,
    },
    location:String,
    country:String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,  //Don't do `{location: {type: String}}`
            enum: ['Point'], //    `location.type` must be 'Point
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    // category:{
    //     type: String,
    //     enum: ["mountains", "arctic", "farms", "deserts"]
    // }
});

listeningSchema.post("findOneAndDelete", async (listing) =>{
    if(listing) {
        await review.deleteMany({ _id: { $in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listeningSchema);
module.exports = Listing;