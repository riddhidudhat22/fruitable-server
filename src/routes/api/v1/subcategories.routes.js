
const express = require('express');
const { subcategoriescontroler } = require('../../../controler');
// const { subcategoriescontroler } = require('../../../controler');

const router = express.Router()

router.get('/get-subcategory/:subcategori_id',
    subcategoriescontroler.getsubcategores
);

router.get('/list-subcategory',
    subcategoriescontroler.listsubcategories
);

router.post('/add-subcategory',
    subcategoriescontroler.addsubcategories
);

router.put('/update-subcategory/:subcategori_id',
subcategoriescontroler.updatesubcategori
);

router.delete('/delete-subcategory/:subcategori_id',
    subcategoriescontroler.deletecsubategori
);

router.get('/getsubcategoridata-by-categorydata/:categori_id',
    subcategoriescontroler.getsubcategoridatawith
)


router.get("/inactive",
    subcategoriescontroler.inactivesubcategory
)

router.get('/parent-of-subcategory/:categori_id',
    subcategoriescontroler.subcategorioncategory
)

router.get('/count-active',
    subcategoriescontroler.activesubcategory
)

router.get('/most-products',
    subcategoriescontroler.highestcategori
)
router.get('/count-products',
    subcategoriescontroler.productwithsubcategori
)
module.exports = router;