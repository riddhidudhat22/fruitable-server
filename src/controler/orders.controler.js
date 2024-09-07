const { default: mongoose } = require("mongoose");
const Orders = require("../model/orders.model");

const addorders = async (req, res) => {
    try {
        const { users_id, seller_id, payment_id, item, shiping_address, amount, discount, stats } = req.body;

        if (!users_id || !seller_id || !payment_id || !item || !shiping_address || amount == null || discount == null || stats == null) {
            return res.status(400).json({
                success: false,
                message: "All required order parameters are missing."
            });
        }

        const order = new Orders({
            users_id,
            seller_id,
            payment_id,
            item,
            shiping_address,
            amount,
            discount,
            stats,
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: "Order added successfully.",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

const getorder = async (req, res) => {
    try {
        const order = await Orders.findById(req.params.order_id)
        console.log(order);

        if (!order) {
            res.status(404).json({
                success: false,
                message: 'order not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'order found susscss',
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const listorder = async (req, res) => {
    // console.log("listproduct");
    try {
        const order = await Orders.find();

        if (!order || order.length === 0) {
            res.status(404).json({
                success: false,
                message: 'order not found.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'product fetch susscss',
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const updateorder = async (req, res) => {
    try {
        const order = await Orders.findByIdAndUpdate(req.params.order_id, req.body, { new: true, runValidators: true })
        console.log(order);

        if (!order) {
            res.status(400).json({
                success: false,
                message: 'order not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'order update successfully',
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}
const deleteorders = async (req, res) => {

    try {
        const order = await Orders.findByIdAndDelete(req.params.order_id)

        if (!order) {
            res.status(404).json({
                success: false,
                message: 'order not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'order deleted successfully',
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}



const listorderofuser = async (req, res) => {

    try {
        const { users_id } = req.params;
        const orders = await Orders.aggregate([
            {
                $match: {
                    users_id: new mongoose.Types.ObjectId(users_id)
                }
            }
        ]
        )
        res.status(200).json({
            success: true,
            message: 'Orders found successfully',
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error: ' + error.message
        });
    }
}

const lstorderofproduct = async (req, res) => {

    
        const { product_id } = req.params;

        const orders = await Orders.aggregate([
            {
                $match: {
                    'item.product_id': new mongoose.Types.ObjectId(product_id)
                }
            },
            {
                $unwind: '$item'
            },
            {
                $match: {
                    'item.product_id': new mongoose.Types.ObjectId(product_id)
                }
            }
        ])

    console.log(orders);


    res.status(200).json({
        success: true,
        message: 'Orders found successfully',
        data: orders
    });
}


const Cancelorder = async (req, res) => {
    const cancelorders = await Orders.aggregate([
        {
            $match: { stats: "cancel" }
        }
    ])
    res.status(200).json({
        success: true,
        message: 'cancelorders successfully.',
        data: cancelorders
    })
}

const listorderofseller = async (req, res) => {
    try {
        const orders = await Orders.find({ seller_id: req.params.seller_id });
        console.log(orders);

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No orders found for this user.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Orders found successfully',
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error: ' + error.message
        });
    }
}
module.exports = {
    addorders,
    listorder,
    updateorder,
    deleteorders,
    getorder,
    listorderofuser,
    lstorderofproduct,
    Cancelorder,
    listorderofseller
}