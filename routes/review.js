const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review =require("../models/review.js")
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn} = require("../middleware.js")


router.post("/",isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!")
    res.redirect(`/listings/${listing.id}`);
}));

// router.post("/:id/reviews", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
//     let listing = await Listing.findById(req.params.id); // Find the listing
//     let newReview = new Review(req.body.review); // Create a new review object
//     newReview.author = req.user._id; // Set the author to the current logged-in user
//     listing.reviews.push(newReview); // Push the new review to the listing's reviews array     
//     await newReview.save(); // Save the review
//     await listing.save(); // Save the updated listing with the new review
//     req.flash("success", "New Review Created!");
//     res.redirect(`/listings/${listing.id}`);
// }));


// router.post("/", wrapAsync(async (req, res) => {
//     const listing = await Listing.findById(req.params.id);
//     console.log(listing);
//     let newReview = new Review(req.body.review);
//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();
//     res.redirect(`/listings/${listing._id}`);
// }));

router.delete("/:reviewId",wrapAsync(async(req,res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Delete Success fully!")
    res.redirect(`/listings/${id}`);
}));
module.exports = router;