const { default: mongoose } = require("mongoose");
const Variants = require("../model/variants.model");
// const { patch } = require("../routes/api/v1/products.routes");
const { updatefile } = require("../utils/coulanary");

const listvariant = async (req, res) => {

  try {
    const variant = await Variants.find();

    if (!variant) {
      res.status(404).send({
        success: false,
        message: 'variant not found.'
      })
    }

    res.status(200).json({
      success: true,
      message: 'variant fetch susscss',
      data: variant
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal error: ' + error.message
    });
  }


}
const addvariant = async (req, res) => {
  // console.log(req.file);

  // const filename=await updatefile(req.file.path, 'variant')
  // console.log(filename);

  try {
    const variant = await Variants.create(req.body)
    console.log(variant);

    if (!variant) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }

    res.status(201).json({
      success: true,
      message: 'variant added successfully',
      data: variant
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal error: ' + error.message
    });
  }



  //       // console.log(req.file);

  //     // const filename=await updatefile(req.file.path, 'variant')
  //     // console.log(filename);
  //     const uploadPromises = req.file.map(files => updatefile(files.path, 'variant'));
  //     const uploadResults = await Promise.all(uploadPromises);
  //     const imageUrls = uploadResults.map(result => result.url);
  //     console.log(imageUrls);
  // try {
  //     const variant=await Variants.create(
  //         {
  //             ...req.body,
  //             image: {
  //                 public_id: imageUrls.public_id,
  //                 url: imageUrls.url
  //             }
  //         }
  //     )
  //     console.log(variant);
  //     // const variant = await Variants.create(req.body)
  //     // console.log(variant);

  //     if (!variant|| categories.length === 0) {
  //         return res.status(400).json({
  //             success: false,
  //             message: 'All fields are required.'
  //         });
  //     }

  //     res.status(201).json({
  //         success: true,
  //         message: 'variant added successfully',
  //         data: variant
  //     });

  // } catch (error) {
  //     res.status(500).json({
  //         success: false,
  //         message: 'Internal error: ' + error.message
  //     });
  // }
}

const deletevariant = async (req, res) => {
  try {
    const variant = await Variants.findByIdAndDelete(req.params.variant_id)

    if (!variant) {
      res.status(404).json({
        success: false,
        message: 'variant not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'variant deleted successfully',
      data: variant
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal error' + error.message
    })
  }
}

const updatevariant = async (req, res) => {
  try {
    const variant = await Variants.findByIdAndUpdate(req.params.variant_id, req.body, { new: true, runValidators: true })
    if (!variant) {
      res.status(400).json({
        success: false,
        message: 'variant not found',
      })
    }
    res.status(200).json({
      success: true,
      message: 'variant update successfully',
      data: variant
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal error' + error.message
    })
  }
}

const getvariant = async (req, res) => {
  try {
    const variant = await Variants.findById(req.params.variant_id);

    if (!variant) {
      res.status(404).send({
        success: false,
        message: 'variant not found.'
      })
    }

    res.status(200).json({
      success: true,
      message: 'variant fetch susscss',
      data: variant
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal error' + error.message
    })
  }
}

const Variantdetails = async (req, res) => {
  const variants = await Variants.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $unwind: "$productDetails"
    },
    {
      $project: {
        _id: 1,
        categori_id: 1,
        subcategori_id: 1,
        product_id: 1,
        price: 1,
        stock: 1,
        discount: 1,
        attributes: 1,
        isActive: 1,
        createdAt: 1,
        updatedAt: 1,
        "productDetails._id": 1,
        "productDetails.name": 1,
        "productDetails.description": 1,
        "productDetails.price": 1,
        "productDetails.stock": 1,
        "productDetails.isActive": 1,
        "productDetails.createdAt": 1,
        "productDetails.updatedAt": 1
      }
    }
  ])
  res.status(200).json({
    success: true,
    message: "variant get  succesfully",
    data: variants
  })

  console.log(variants);
}

const variantparticularproduct = async (req, res) => {
  const { product_id } = req.params;
  const variants = await Variants.aggregate([
    {
      $match: {
        product_id: new mongoose.Types.ObjectId(product_id)
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $unwind: "$productDetails"
    },
    {
      $project: {
        _id: 1,
        categori_id: 1,
        subcategori_id: 1,
        product_id: 1,
        price: 1,
        stock: 1,
        discount: 1,
        attributes: 1,
        isActive: 1,
        createdAt: 1,
        updatedAt: 1,
        "productDetails._id": 1,
        "productDetails.name": 1,
        "productDetails.description": 1,
        "productDetails.price": 1,
        "productDetails.stock": 1,
        "productDetails.isActive": 1,
        "productDetails.createdAt": 1,
        "productDetails.updatedAt": 1
      }
    }
  ])
  res.status(200).json({
    success: true,
    message: "variant get  succesfully",
    data: variants
  })

  console.log(variants);
}

const countstock = async (req, res) => {
  const { product_id } = req.params;
  const variants = await Variants.aggregate([
    {
      $match: {
        product_id: new mongoose.Types.ObjectId(product_id)
      }
    },
    {
      $group: {
        _id: "$product_id",
        totalStock: { $sum: "$stock" }
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $unwind: "$productDetails"
    },
    {
      $project: {
        productId: "$_id",
        totalStock: 1,
        "productDetails.name": 1,
        "productDetails.description": 1
      }
    }
  ])
  res.status(200).json({
    success: true,
    message: "variant get  succesfully",
    data: variants
  })

  console.log(variants);
}

const productslowstock = async (req, res) => {
  const variants = await Variants.aggregate([
    {
      $match: {
        stock: { $lt: 20 }
      }
    },
    {
      $group: {
        _id: "$product_id",
        totalStock: { $sum: "$stock" },
        variants: {
          $push: {
            variant_id: "$_id",
            stock: "$stock",
            price: "$price",
            discount: "$discount",
            attributes: "$attributes"
          }
        }
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $unwind: "$productDetails"
    },

    {
      $project: {
        _id: 0,
        productId: "$_id",
        totalStock: 1,
        variants: 1,
        "productDetails.name": 1,
        "productDetails.description": 1
      }
    },
    {
      $limit: 1
    }
  ])
  res.status(200).json({
    success: true,
    message: "variant get  succesfully",
    data: variants
  })

  console.log(variants);
}

const productswithhighesprices = async (req, res) => {
  const variants = await Variants.aggregate([
    {
      $sort: {
        price: -1
      }
    },
    {
      $group: {
        _id: "$product_id",
        highestPrice: { $max: "$price" },
        variants: {
          $push: {
            variant_id: "$_id",
            price: "$price",
            stock: "$stock",
            discount: "$discount",
            attributes: "$attributes"
          }
        }
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $unwind: "$productDetails"
    },
    {
      $project: {
        _id: 0,
        productId: "$_id",
        highestPrice: 1,
        variants: 1,
        "productDetails.name": 1,
        "productDetails.description": 1
      }
    },
    {
      $sort: {
        highestPrice: -1
      }
    },
    {
      $limit: 1
    }
  ])

  res.status(200).json({
    success: true,
    message: "variant get  succesfully",
    data: variants
  })

  console.log(variants);
}

const morethanonevariant = async (req, res) => {
  const variants = await Variants.aggregate([
    {
      $group: {
        _id: "$product_id",
        multiplevariantCount: { $sum: 1 },
        variants: {
          $push: {
            variant_id: "$_id",
            price: "$price",
            stock: "$stock",
            discount: "$discount",
            attributes: "$attributes"
          }
        }
      }
    },
    {
      $match: {
        multiplevariantCount: { $gt: 1 }
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $unwind: "$productDetails"
    },
    {
      $project: {
        _id: 0,
        productId: "$_id",
        multiplevariantCount: 1,
        variants: 1,
        "productDetails.name": 1,
        "productDetails.description": 1
      }
    },

  ])

  res.status(200).json({
    success: true,
    message: "variant get  succesfully",
    data: variants
  })

  console.log(variants);
}

const activevarint = async (req, res) => {
  const variants = await Variants.aggregate([
    {
      $match: {
        isActive: true
      }
    },
    {
      $project: {
        _id: 1,
        categori_id: 1,
        subcategori_id: 1,
        product_id: 1,
        price: 1,
        stock: 1,
        discount: 1,
        attributes: 1,
        createdAt: 1,
        updatedAt: 1
      }
    }
  ])
  res.status(200).json({
    success: true,
    message: "variant get  succesfully",
    data: variants
  })
  console.log(variants);
}

const countptoduct = async (req, res) => {
  const variants = await Variants.aggregate([
    {
      $group: {
        _id: "$product_id",
        countProducts: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        product_id: "$_id",
        countProducts: 1
      }
    }
  ])
  res.status(200).json({
    success: true,
    message: "variant get  succesfully",
    data: variants
  })
  console.log(variants);
}


module.exports = {
  listvariant,
  addvariant,
  deletevariant,
  updatevariant,
  getvariant,
  Variantdetails,
  variantparticularproduct,
  countstock,
  productslowstock,
  productswithhighesprices,
  morethanonevariant,
  activevarint,
  countptoduct
}