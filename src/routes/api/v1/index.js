const express = require('express')

const router = express.Router();

const categoriesRouter = require('./categories.routes');
router.use("/categories", categoriesRouter)

const subcategoriesRouter = require('./subcategories.routes');
router.use("/subcategories", subcategoriesRouter)

const productRouter = require('./products.routes');
router.use("/products", productRouter)

const variantRouter = require('./variants.routes');
router.use("/variants", variantRouter)

const salespeopleRouter = require('./salespeoples.routes')
router.use("/salespeoples",salespeopleRouter)

const usersRouter = require('./users.routes')
router.use("/users",usersRouter)

const reviewsRouter = require('./ratings.routes')
router.use("/ratings",reviewsRouter)

const ordersRouter = require('./orders.routes')
router.use("/orders",ordersRouter)

const paymentsRouter = require('./payments.routes')
router.use("/payments",paymentsRouter)

const cartsRouter = require('./carts.routes')
router.use("/carts",cartsRouter)

module.exports = router;

