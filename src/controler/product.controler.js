const upload = require("../middleware/upload");
const Products = require("../model/products.model");
const { updatefile } = require("../utils/coulanary");

const listproducts = async (req, res) => {
    // console.log("listproduct");
    try {
        const product = await Products.find();

        if (!product || product.length === 0) {
            res.status(404).json({
                success: false,
                message: 'product not found.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'product fetch susscss',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const addproducts = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const filename = await updatefile(req.file.path, 'product')
    console.log(filename);

    try {
        const product = await Products.create(
            {
                ...req.body,
                image: {
                    public_id: filename.public_id,
                    url: filename.url
                }
            }
        )
        console.log(product);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        res.status(201).json({
            success: true,
            message: 'product added successfully',
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error: ' + error.message
        });
    }
}

const getproducts = async (req, res) => {
    try {
        const product = await Products.findById(req.params.product_id)
        console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'product not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'product found susscss',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const deleteproduct = async (req, res) => {
    console.log("deletecsubategori");
    try {
        const product = await Products.findByIdAndDelete(req.params.product_id)
        console.log(product);


        if (!product) {
            res.status(404).json({
                success: false,
                message: 'product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'product deleted successfully',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const udateproduct = async (req, res) => {

    console.log(req.params.product_id, req.body, req.file);

    if (req.file) {
        console.log("new file");

        const filename = await updatefile(req.file.path, 'product')
        console.log(filename);

        const updatedProductData = {
            ...req.body,
            image: {
                public_id: filename.public_id,
                url: filename.url
            }
        };

        const product = await Products.findByIdAndUpdate(req.params.product_id, updatedProductData, { new: true, runValidators: true });

        if (!product) {
            res.status(400).json({
                success: false,
                message: 'product not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'product update successfully',
            data: product
        })
    } else {
        console.log("old file");
        try {
            const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true })
            console.log(product);

            if (!product) {
                res.status(400).json({
                    success: false,
                    message: 'product not found',
                })
            }
            res.status(200).json({
                success: true,
                message: 'product update successfully',
                data: product
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal error' + error.message
            })
        }
    }
    // try {
    //     const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true })
    //     console.log(product);

    //     if (!product) {
    //         res.status(400).json({
    //             success: false,
    //             message: 'categori not found',
    //         })
    //     }
    //     res.status(200).json({
    //         success: true,
    //         message: 'categori update successfully',
    //         data: product
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: 'Internal error' + error.message
    //     })
    // }
}
const getproducttawith = async (req, res) => {
    try {
        const product = await Products.find({ subcategori_id: req.params.subcategori_id })

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'product not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'product found susscss',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}



// const searchName = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { sortOrder, rating, max, min, category, page, limit } = req.query;;

//         const matchPip = {};

//         if (rating) {
//             matchPip['avgRating'] = { "$gte": rating };
//         }
//         if (category) {
//             matchPip['category_id'] = category;
//         }

//         if (min != undefined || max != undefined) {
//         matchPip['variant.attributes.Price'] = {};
//         if (min != undefined) {
//             matchPip['variant.attributes.Price'].$gte = min;
//         }
//         if (max != undefined) {
//             matchPip['variant.attributes.Price'].$lte = max;
//         }
//         }

//         console.log("kkkkkkkkkkkkkkkk",matchPip);

//         const pipeline = [
//             {
//                 $lookup: {
//                     from: 'variants',
//                     localField: '_id',
//                     foreignField: 'product_id',
//                     as: 'variant'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'reviews',
//                     localField: '_id',
//                     foreignField: 'product_id',
//                     as: 'review'
//                 }
//             },
//             {
//                 $addFields: {
//                     avgRating: { $avg: '$review.rating' }
//                 }
//             },
//             {
//                 $unwind: {
//                     path: '$variant'
//                 }
//             },
//             {
//                 $match: matchPip
//             },
//             {
//                 $group: {
//                     _id: '$_id',
//                     name: { $first: '$name' },
//                     variant: { $push: "$variant" },
//                     review: { $push: "$review" },
//                     avgRating: { $first: "$avgRating" }
//                 }
//             },
//             {
//                 $sort: {
//                     name: sortOrder === "asc" ? 1 : -1
//                 }
//             },
//             {
//                 $skip: (page - 1) * limit
//             },
//             {
//                 $limit: limit
//             }
//         ];

//         if (page>0&&limit>0) {
//             pipeline.push({$skip: (page-1)*limit})
//             pipeline.push({ $limit: limit})
//         }
//         const data = await Products.aggregate(pipeline);

//  console.log("gygyggyggggggg",data);
//         res.status(200).json({
//             success: true,
//             message: "Product data fetched",
//             data: data
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while fetching products",
//             error: error.message
//         });
//     }
// };



const searchName = async (req, res) => {
    try {
        console.log(req.query);
        const { sortOrder, rating, max, min, category, page, limit } = req.query;;

        const matchPip = {};

        if (rating) {
            matchPip['avgRating'] = { "$gte": parseInt(rating) };
        }
        if (category) {
            matchPip['category_id'] = parseInt(category);
        }

        if (min != undefined || max != undefined) {
            matchPip['variant.attributes.Price'] = {};
            if (min != undefined) {
                matchPip['variant.attributes.Price'].$gte = parseFloat(min);
            }
            if (max != undefined) {
                matchPip['variant.attributes.Price'].$lte = parseFloat(max);
            }
        }

        console.log("kkkkkkkkkkkkkkkk", matchPip);

        const pipeline = [
            {
                $lookup: {
                    from: 'variants',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'variant'
                }
            },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'review'
                }
            },
            {
                $addFields: {
                    avgRating: { $avg: '$review.rating' }
                }
            },
            {
                $unwind: {
                    path: '$variant'
                }
            },
            {
                $match: matchPip
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    variant: { $push: "$variant" },
                    review: { $push: "$review" },
                }
            },
            {
                $sort: {
                    name: sortOrder === "asc" ? 1 : -1
                }
            }
        ];

        if (page > 0 && limit > 0) {
            pipeline.push({ $skip: (parseInt(page) - 1) * parseInt(limit) })
            pipeline.push({ $limit: parseInt(limit) })
        }
        const data = await Products.aggregate(pipeline);
        console.log("gygyggyggggggg", data);

        res.status(200).json({
            success: true,
            message: "Product data fetched",
            data: data
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products",
            error: error.message
        });
    }
};


const productsByCategory = async (req, res) => {

    const products = await Products.aggregate([

        {
            $lookup: {
                from: "categories",
                localField: "categori_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: {
                path: "$category"
            }
        },
        {
            $project: {
                "name": 1,
                "image.url": 1,
                "category": 1
            }
        }

    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const productsBySubcategory = async (req, res) => {

    const products = await Products.aggregate([
        {
            $lookup: {
                from: "subcategories",
                localField: "subcategori_id",
                foreignField: "_id",
                as: "subcategory"
            }
        },
        {
            $unwind: {
                path: "$subcategory"
            }
        },
        {
            $project: {
                "name": 1,
                "image.url": 1,
                "subcategory": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const topRate = async (req, res) => {

    const products = await Products.aggregate([
        {
            $sort: {
                "Totalrating": -1
            }
        },
        {
            $limit: 1
        }

    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const newArrivals = async (req, res) => {

    const products = await Products.aggregate([
        {
            $sort: {
                "createdAt": -1
            }
        },
        {
            $limit: 3
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const countCategories = async (req, res) => {

    const products = await Products.aggregate([

        {
            $lookup: {
                from: "categories",
                localField: "categori_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: {
                path: "$category"
            }
        },
        {
            $group: {
                _id: "$category._id",
                "category_name": { $first: "$category.name" },
                "product_name": { $push: "$name" },
                "TotalProduct": {
                    $sum: 1
                }
            }
        }

    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const discount = async (req, res) => {
    try {


        const product = await Products.aggregate(
            [
                {
                    $match: {
                        isActive: true
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "categori_id",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $lookup: {
                        from: "subcategories",
                        localField: "subcategori_id",
                        foreignField: "_id",
                        as: "subcategory"
                    }
                },
                {
                    $unwind: "$category" // Flatten the category array
                },
                {
                    $unwind: "$subcategory" // Flatten the subcategory array
                },
                {
                    $group: {
                        _id: {
                            category_id: "$categori_id",
                            subcategory_id: "$subcategori_id" // Corrected field name to match
                        },
                        category_name: { $first: "$category.name" },
                        subcategory_name: { $first: "$subcategory.name" },
                        products: {
                            $push: {
                                _id: "$_id",
                                name: "$name",
                                description: "$description",
                                price: "$price",
                                stock: "$stock"
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category_id: "$_id.category_id",
                        subcategory_id: "$_id.subcategory_id",
                        category_name: 1,
                        subcategory_name: 1,
                        products: 1
                    }
                }
            ]

        );



        res.status(200).json({
            success: true,
            message: "Product fetched sucessfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}
const outofstock = async (req, res) => {
    console.log("ok");

    const outofstock = await Products.aggregate([
        {
            "$lookup": {
                "from": "variants",
                "localField": "_id",
                "foreignField": "product_id",
                "as": "variants"
            }
        },
        {
            "$match": {
                "variants": { "$size": 0 },
                "stock": 0
            }
        },
        {
            "$project": {
                "_id": 1,
                "name": 1,
                "description": 1,
                "price": 1,
                "stock": 1
            }
        }
    ]
    )
    res.status(200).json({
        success: true,
        message: 'product fetch successfully.',
        data: outofstock
    })
    console.log(outofstock);
}

const variantsDatils = async (req, res) => {
    const variantsDatils = await Products.aggregate(
        [
            // {
            //   $match: {
            //     _id: ObjectId("66704274d11211519b0d6b68")
            //   }
            // },
            {
                $lookup: {
                    from: "variants",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variants"
                }
            },
            {
                $unwind: {
                    path: "$variants"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    stock: 1,
                    variants: {
                        _id: "$variants._id",
                        variant_name: "$variants.name",
                        variant_price: "$variants.price",
                        variant_stock: "$variants.stock",
                        variant_details: "$variants.details"
                    }
                }
            }
        ]


    )
    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: variantsDatils
    })
}
module.exports = {
    listproducts,
    addproducts,
    getproducts,
    deleteproduct,
    udateproduct,
    getproducttawith,
    searchName,
    productsByCategory,
    productsBySubcategory,
    topRate,
    newArrivals,
    countCategories,
    discount,
    outofstock,
    variantsDatils
}


// http://localhost:8000/api/v1/products/search?sortOrder=asc&rating=4&max=10000&min=0&category=1&page=1&limit=1




// http://localhost:8000/api/v1/products/search?sortOrder=asc&rating=4&max=5000&min=0&category=1&page=1&limit=2








