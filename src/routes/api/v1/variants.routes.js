
const express = require('express');
const { variantcontroler } = require('../../../controler');
const upload = require('../../../middleware/upload');

const router = express.Router();


router.get('/list-variant',
    variantcontroler.listvariant
)


router.get('/get-variant/:variant_id',
    variantcontroler.getvariant
)
// router.post('/add-variant',
//     upload.array("image"),
//     variantcontroler.addvariant
// )


router.post('/add-variant',
     upload.array('image', 10), 
variantcontroler.addvariant);

router.delete('/delete-variant/:variant_id',
    variantcontroler.deletevariant
);

router.put('/update-variant/:variant_id',
    variantcontroler.updatevariant
);

router.get('/product/:product_id',
    variantcontroler. Variantdetails
);

router.get('/list-variant/:product_id',
    variantcontroler. variantparticularproduct
);

router.get('/count-stock/:product_id',
    variantcontroler. countstock
);

router.get('/low-quantity',
    variantcontroler. productslowstock
);

router.get('/high-price',
    variantcontroler. productswithhighesprices
);

router.get('/multiple-variants',
    variantcontroler. morethanonevariant
);

router.get('/active',
    variantcontroler. activevarint
);

router.get('/count-products',
    variantcontroler. countptoduct
);

module.exports = router