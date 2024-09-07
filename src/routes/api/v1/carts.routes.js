const express = require('express');
const { cartcontroler } = require('../../../controler');




const router = express.Router();

router.get(
    "/get-cart/:users_id",
    cartcontroler.getCart
)

router.post(
    '/add-to-cart',
    cartcontroler.addCart
)


router.put(
    '/update-cart/:cart_id',
    cartcontroler.updateCart
)

router.delete('/delete-cart/:cart_id/:product_id',
    cartcontroler.deleteCartItem
);

module.exports = router;
