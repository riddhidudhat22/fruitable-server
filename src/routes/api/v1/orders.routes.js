const express = require('express');
const { Ordercontroler } = require('../../../controler');



const router = express.Router();

router.get(
    "/list-order",
    Ordercontroler.listorder
)

router.get('/get-order/:order_id',
    Ordercontroler.getorder
);

router.post(
    "/add-order",
    Ordercontroler.addorders
)

router.put(
    "/update-order/:order_id",
    Ordercontroler.updateorder
)

router.delete(
    "/delete-order/:order_id",
    Ordercontroler.deleteorders
)
router.get(
    "/user/:users_id",
    Ordercontroler.listorderofuser
)


router.get(
    "/product/:product_id",
    Ordercontroler.lstorderofproduct
)

router.get(
    "/cancel",
    Ordercontroler.Cancelorder
)


router.get(
    "/seller/:seller_id",
    Ordercontroler.listorderofseller
)
module.exports = router;


     