
const express = require('express');
const { variantcontroler } = require('../../../controler');
const upload = require('../../../middleware/upload');

const router = express.Router();
router.get('/list-variant',
    variantcontroler.listvariant
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
module.exports = router