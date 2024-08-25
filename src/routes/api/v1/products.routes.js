
const express = require('express');
const { product } = require('../../../controler');
const upload = require('../../../middleware/upload');

const router = express.Router()

router.get('/get-product/:product_id',
    product.getproducts
);

router.get('/list-product',
    product.listproducts
);

router.post('/add-product',
    upload.single("image"),
    product.addproducts
);

router.put('/update-product/:product_id',
    upload.single("image"),
    product.udateproduct
);

router.delete('/delete-product/:product_id',
    product.deleteproduct
);

router.get('/getroductdata-by-subcategorydata/:subcategori_id',
    product.getproducttawith
)


router.get('/search',
    product.searchName
)

router.get('/list-category/:categori_id',
    product.productsByCategory
)

router.get('/list-subcategory/:subcategori_id',
    product.productsBySubcategory

)

router.get('/top-rated',
    product.topRate
)

router.get( '/new-arrivals',
    product.newArrivals
)
router.get('/count-categories',
    product.countCategories
)


module.exports = router;