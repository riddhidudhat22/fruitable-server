const express = require('express');
const { userscontroler } = require('../../../controler');
const passport = require('passport');
const exportpdfmake = require('../../../utils/pdfmake');
const { sendotp, veryfeotp } = require('../../../utils/twilio');
const upload = require('../../../middleware/upload');
const { Tokenaccess } = require('../../../controler/users.controler');
const Users = require('../../../model/users.model');


const router = express.Router()

router.post('/ragisterusers',
    // upload.single('avtar'),
    userscontroler.ragister
);

router.get('/veryfeotp',
    veryfeotp,
    userscontroler.ragisterotp
);


router.get('/authcheck',
    userscontroler.authcheck
);

router.get('/get-user/:users_id',
    userscontroler.getuserdata
);

router.post('/ragisterotp',
    sendotp,
    userscontroler.ragisterotp
);

router.post('/loginusers',
    userscontroler.login
);

router.post('/genrateNewToken',
    userscontroler.newtoken
);

router.post('/logout',
    userscontroler.logout
);

router.get('/googlelogin',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function (req, res) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(req.isAuthenticated());
        console.log(req.session);
        // res.send('<h1>okkkk</h1>')
        console.log("sfdfdffdgfgfgfhghghghgh");
        
        if (req.isAuthenticated()) {
            const { accessToken, refreshtoken } = await Tokenaccess(req.session.passport.user)
            console.log({ accessToken, refreshtoken });


            const optionaccess = {
                httpOnly: true,
                sequre: true,
                maxAge: 36000000,
                sameSite:"None"
            }
            const optionrefres = {
                httpOnly: true,
                sequre: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite:"None"
            }
            res.status(200)
                .cookie("AccessToken", accessToken, optionaccess)
                .cookie("refreshtoken", refreshtoken, optionrefres)

            res.redirect("http://localhost:3000")
        }
        // Successful authentication, redirect home.

    });

router.get('/facebooklogin',
    passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("Login success.....");
        res.send('<h1>Facebook Login successful</h1>');
    });


router.get('/pdfsend',
    exportpdfmake
)

router.get(
    '/list-user',
    userscontroler.listUser
)


router.get(
    '/order/:users_id',
    userscontroler.orderofuser
)

router.put(
    '/update-user/:users_id',
    userscontroler.updateUser
)

router.delete(
    '/delete-user/:users_id',
    userscontroler.deleteUser
)


router.get('/searchdata',
    userscontroler.searchUser
)
module.exports = router;

// http://localhost:8000/api/v1/users/facebooklogin
