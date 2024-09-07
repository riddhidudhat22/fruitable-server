
const express = require('express');
const { categoriescontroler } = require('../../../controler');
const upload = require('../../../middleware/upload');
const { veryfeotp } = require('../../../utils/twilio');
const { validation } = require('../../../middleware/validation');
const { categorivalidation } = require('../../../validation');
const { auth } = require('../../../middleware/auth');

const router = express.Router()

router.get('/get-category/:categori_id',
    validation(categorivalidation.getcategory),
    categoriescontroler.getcategories
);

router.get('/list-category',
    auth(["admin","employe",'user']),
    categoriescontroler.listcategories
);


router.post('/add-category',
    upload.single("image"),
    validation(categorivalidation.createcategory),
    categoriescontroler.addcategories
);

router.put('/update-category/:categori_id',
    validation(categorivalidation.updatecategory),
    categoriescontroler.udatecategories
);

router.delete('/delete-category/:categori_id',
    validation(categorivalidation.deletecategory),
    categoriescontroler.deletecategories
);

router.get("/category/count-active",
    categoriescontroler.activecategory
)

router.get("/category/inactive",
    categoriescontroler.inactivecategory
)


router.get("/category/most-products",
    categoriescontroler.highestnum
)

router.get("/category/average-products",
    categoriescontroler.averagenuproduct
)

router.get("/category/count-subcategories",
    categoriescontroler.countsubcategories
)

router.get("/category-subcategory/:categori_id",
    categoriescontroler.subcategorioncategori

)

module.exports = router;