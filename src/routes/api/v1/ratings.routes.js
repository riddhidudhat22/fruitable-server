const express = require('express');
const { Ratingesdata } = require('../../../controler');


const router = express.Router();

router.get(
    "/list-rating",
    Ratingesdata.listRating
)

router.post(
    "/create-review",
    Ratingesdata.addReview
)


router.delete(
    "/delete-review/:review_id",
    Ratingesdata.deleteReview
)

router.put(
    "/update-review/:review_id",
    Ratingesdata.updateReview
)


router.get(
    '/count-products',
    Ratingesdata.countProduct
)

router.get(
    '/top-rated-products',
    Ratingesdata.topratedproducts
)

router.get(
    '/get-review/:review_id',
    Ratingesdata.getReview
)

router.get(
    '/with-comments',
    Ratingesdata.includecomments
)

router.get(
    '/no-reviews',
    Ratingesdata.NoReviews
)


router.get(
    '/user/:users_id', 
    Ratingesdata.reviewofuser
)

module.exports = router