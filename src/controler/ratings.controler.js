const Ratings = require("../model/ratings.model");

const listRating = async (req, res) => {
    try {
        const Ratinge = await Ratings.find()
  
        if (!Ratinge || Ratinge.length === 0) {
            res.status(404).json({
                success: false,
                message: "Ratinge data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Ratinge data fetched",
            data: Ratinge,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const addReview = async (req, res) => {

    try {
        const Ratinge = await Ratings.create({ ...req.body });
        if (!Ratinge) {
            res.status(400).json({
                success: true,
                message: "failed to added Ratinge",
                data: Ratinge,
            });
        }
        res.status(200).json({
            success: true,
            message: "Ratinge added successfully",
            data: Ratinge,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};
const deleteReview = async (req, res) => {
    try {
        const Ratinge = await Ratings.findByIdAndDelete(req.params.review_id)

        if (!Ratinge) {
            res.status(400).json({
                success: false,
                message: 'Ratinge not deleted.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Ratinge deleted successfully.',
            data: Ratinge
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.message
        })
    }
}

const updateReview = async (req, res) => {
    try {
        const { review_id } = req.params;
        const updatedRating = await Ratings.findByIdAndUpdate(review_id, req.body, { new: true, runValidators: true });

        if (!updatedRating) {
            return res.status(404).json({
                success: false,
                message: 'Rating not found or not updated.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Rating updated successfully.',
            data: updatedRating
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
};

const countProduct = async (req, res) => {
    const Ratinge = await Ratings.aggregate(
        [
            {
                $group: {
                    _id: "$product_id",
                    review_count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    review_count: -1
                }
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: 'Ratinge deleted successfully.',
        data: Ratinge
    })
}

const topratedproducts = async (req, res) => {
    const Ratinge = await Ratings.aggregate(
        [{
            $sort: {
                "Totalrating": -1
            }
        },
        {
            $limit: 1
        }
]
    )
    res.status(200).json({
        success: true,
        message: 'Ratinge topratedproducts successfully.',
        data: Ratinge
    })
}

const getReview = async (req, res) => {

    try {
        const rating = await Ratings.findById(req.params.review_id)
        console.log(rating);

        if (!rating) {
            res.status(404).json({
                success: false,
                message: 'rating not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'rating found susscss',
            data: rating
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const includecomments = async (req, res) => {
    const review = await Ratings.aggregate(
        [
            {
                "$match": {
                    "comment": {
                        "$exists": true,
                        "$ne": ""
                    }
                }
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: 'review fetch successfully.',
        data: review
    })
}

const NoReviews = async (req, res) => {
    const reviews = await Ratings.aggregate(
        [
            {
                $lookup: {
                    from: 'review',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'review'
                }
            },
            {
                $match: {
                    review: { $size: 0 }
                }
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: 'Reviews fetched successfully.',
        data: reviews
    });
}


const reviewofuser = async (req, res) => {
    const reviews = await Ratings.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "users_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $match: {
                user: { $ne: [] }
            }
        },
        {
            $project: {
                user: 1,
                product: 1
            }
        },
        
    ]
    )

    res.status(200).json({
        success: true,
        message: "reviews get  succesfully",
        data: reviews
    })

    console.log(reviews);
}

module.exports = {
    listRating,
    addReview,
    deleteReview,
    updateReview,
    countProduct,
    topratedproducts,
    getReview,
    includecomments,
    NoReviews,
    reviewofuser
}