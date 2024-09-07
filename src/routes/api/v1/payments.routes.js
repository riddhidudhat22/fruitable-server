const express = require('express');
const { paymentscontroler } = require('../../../controler');


const router = express.Router();

router.get(
    "/list-payments",
    paymentscontroler.listpayment
)

router.post(
    "/add-payments",
    paymentscontroler.addpayment
)

router.put(
    "/update-payments/:payment_id",
    paymentscontroler.updatepayment
)

router.delete(
    "/delete-payments/:payment_id",
    paymentscontroler.deletepayment
)

router.get(
    "/get-payments/:payment_id",
    paymentscontroler.getpayment
)

router.get(
    "/order/:order_id",
    paymentscontroler.Paymentdetailsorder
)
module.exports = router;