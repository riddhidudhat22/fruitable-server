const { default: mongoose } = require("mongoose");
const Payments = require("../model/payments.model");

const listpayment = async (req, res) => {
    try {
        const payments = await Payments.find();

        if (!payments || payments.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No payments found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Payments fetched successfully.',
            data: payments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
}

const addpayment = async (req, res) => {
    console.log("sdfdfd", req.body);
    try {
        const payments = await Payments.create(req.body);
        console.log(payments);
        if (!payments) {
            res.status(400).json({
                success: false,
                message: 'payments not created'
            })
        }
        res.status(201).json({
            success: true,
            message: 'payments created successfully',
            data: payments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
};

const updatepayment = async (req, res) => {
    console.log("ddddddddddddddddddddd", req.params.payment_id, req.body);
    try {
        const payments = await Payments.findByIdAndUpdate(req.params.payment_id, req.body, { new: true, runValidators: true })
        console.log(payments);

        if (!payments) {
            return res.status(400).json({
                success: false,
                message: 'payments not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'payments update successfully',
            data: payments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}
const deletepayment = async (req, res) => {
    // console.log(req.params.categori_id);
    try {
        const payments = await Payments.findByIdAndDelete(req.params.payment_id)
        console.log(payments);

        if (!payments) {
            res.status(404).json({
                success: false,
                message: 'payments not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'payments deleted successfully',
            data: payments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const getpayment = async (req, res) => {

    try {
        const payment = await Payments.findById(req.params.payment_id)
        console.log(payment);

        if (!payment) {
            res.status(404).json({
                success: false,
                message: 'payment not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'payment found successfuly',
            data: payment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const Paymentdetailsorder = async (req, res) => {
    const { order_id } = req.params;
    const payment = await Payments.aggregate(
        [
            {
                $match: {
                    order_id: new mongoose.Types.ObjectId(order_id)
                }
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "_id",      
                    foreignField: "_id", 
                    as: "paymentDetails"     
                }
            },
            {
                $unwind: {
                    path: "$paymentDetails", 
                    preserveNullAndEmptyArrays: true 
                }
            },
            {
                $project: {
                    _id: 1,
                    order_id: 1,
                    gateway: "$paymentDetails.gateway",
                    status: "$paymentDetails.status",
                }
            }
        ]

    )
    res.status(200).json({
        success: true,
        message: "payment get  succesfully",
        data: payment
    })
}
module.exports = {
    listpayment,
    addpayment,
    updatepayment,
    deletepayment,
    getpayment,
    Paymentdetailsorder
}
