const Subcategories = require("../model/subcategories.model");

const listsubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategories.find();

        if (!subcategories || subcategories.length === 0) {
            res.status(404).send({
                success: false,
                message: 'subcaregorie not found.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'subcategories fetch susscss',
            data: subcategories
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const getsubcategores = async (req, res) => {

    try {
        const subcaregori = await Subcategories.findById(req.params.subcategori_id)

        if (!subcaregori) {
            res.status(404).json({
                success: false,
                message: 'subcaregori not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'subcaregori found susscss',
            data: subcaregori
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}


// const addsubcategories = async (req, res) => {

//     try {

//         const subcategori = await Subcategories.create(req.body)
//         console.log(subcategori);

//         if (!subcategori) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'All fields are required.'
//             });
//         }

//         res.status(201).json({
//             success: true,
//             message: 'Subcategory added successfully',
//             data: subcategori
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal error: ' + error.message
//         });
//     }
// }
const addsubcategories = async (req, res) => {
    try {
        // Validate request body
        const { categori_id, name, description } = req.body;

        if (!categori_id || !name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: categori_id, name, and description.',
            });
        }

        // Create a new subcategory
        const subcategori = await Subcategories.create({ categori_id, name, description });

        if (!subcategori) {
            return res.status(400).json({
                success: false,
                message: 'Failed to create subcategory.',
            });
        }

        res.status(201).json({
            success: true,
            message: 'Subcategory added successfully',
            data: subcategori,
        });

    } catch (error) {
        // Improved error handling with specific message
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message,
        });
    }
};

const deletecsubategori = async (req, res) => {

    try {
        const subcategori = await Subcategories.findByIdAndDelete(req.params.subcategori_id)

        if (!subcategori) {
            res.status(404).json({
                success: false,
                message: 'subcategori not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'subcategori deleted successfully',
            data: subcategori
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const updatesubcategori = async (req, res) => {
    try {
        const subcategori = await Subcategories.findByIdAndUpdate(req.params.subcategori_id, req.body, { new: true, runValidators: true })
        if (!subcategori) {
            res.status(400).json({
                success: false,
                message: 'subcategori not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'subcategori update successfully',
            data: subcategori
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const getsubcategoridatawith = async (req, res) => {
    try {
        const subcaregori = await Subcategories.find({ categori_id: req.params.categori_id })

        if (!subcaregori) {
            res.status(404).json({
                success: false,
                message: 'subcaregori not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'subcaregori found susscss',
            data: subcaregori
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}




const subcategorioncategory = async (req, res) => {
    const subcategories = await Subcategories.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "categori_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $project: {
                "name": 1,
                "category": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: subcategories
    })

    console.log(subcategories);

}

const activesubcategory = async (req, res) => {

    const activesubcategori = await Subcategories.aggregate([
        {
            $match: {
                isActive: true
            }
        },
        {
            $count: 'isActivenumofsubcategory'
        }

    ]);
    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: activesubcategori
    })

    console.log(activesubcategori);
}

const highestcategori = async (req, res) => {
    const subcategories = await Subcategories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "subcategori_id",
                as: "product"
            }
        },
        {
            $match: {
                "product": { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$_id",
                "subcategory_name": { $first: "$name" },
                "CountProduct": {
                    $sum: 1
                },
                "product_name": { $push: "$product.name" }
            }
        },
        {
            $sort: {
                "CountProduct": -1
            }
        },
        {
            $limit: 5
        }

    ])

    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: subcategories
    })

    console.log(subcategories);
}

const inactivesubcategory = async (req, res) => {
    const inactivesubcategori = await Subcategories.aggregate([
        {
            $match: {
                isActive: false,
            }
        },
        {
            $count: 'Inactivesubcategori'
        }
    ]);
    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: inactivesubcategori
    })
    console.log(inactivesubcategori);
}

const productwithsubcategori = async (req, res) => {
    const subcategories = await Subcategories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "subcategori_id",
                as: "product"
            }
        },
        {
            $match: {
                "product": { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$_id",
                "subcategory_name": { $first: "$name" },
                "CountProduct": {
                    $sum: 1
                },
                "product_name": { $push: "$product.name" }
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: subcategories
    })

    console.log(subcategories);
}


module.exports = {
    listsubcategories,
    getsubcategores,
    addsubcategories,
    deletecsubategori,
    updatesubcategori,
    getsubcategoridatawith,
    activesubcategory,
    inactivesubcategory,
    subcategorioncategory,
    highestcategori,
    productwithsubcategori
}


