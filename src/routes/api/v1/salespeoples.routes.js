const express = require('express')
const { salespeoplecontroler } = require('../../../controler')

const router = express.Router();


router.get('/list-salespeople',
    salespeoplecontroler.listselspeople
)

router.post('/add-salespeople',
    salespeoplecontroler.addselspeople
)

router.delete('/delete-salespeople/:SNUM',
    salespeoplecontroler.deleteselspeople
)

// router.put('/update-salespeople/:SNUM',
//     salespeoplecontroler.updateselpeople
// )
router.put('/update-salespeople/:SNUM',
    salespeoplecontroler.updateselpeople
);
module.exports = router