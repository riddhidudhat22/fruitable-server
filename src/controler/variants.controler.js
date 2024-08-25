const Variants = require("../model/variants.model");
// const { patch } = require("../routes/api/v1/products.routes");
const { updatefile } = require("../utils/coulanary");

const listvariant = async (req, res) => {

    try {
        const variant = await Variants.find();

        if (!variant) {
            res.status(404).send({
                success: false,
                message: 'subcaregorie not found.'
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

const deletevariant=async(req,res)=>{
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

const updatevariant=async(req,res)=>{
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
module.exports = {
    listvariant,
    addvariant,
    deletevariant,
    updatevariant
}