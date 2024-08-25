const sendotp = (req, res, next) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;          
        const client = require('twilio')(accountSid, authToken);

        const otp = Math.floor(1000 + Math.random() * 9000);

        req.session.otp = otp
        client.messages
            .create({
                body: otp,
                from: process.env.TWILIO_OTP_PHONENO,
                to: '+918799593178'
            })
            .then(message => next())

    } catch (error) {
        console.log("send otp error:", error);

    }
}
const veryfeotp = (req, res, next) => {
    console.log("otp: ", req.session.otp);
    // if (req.session.otp == req.body.otp) {
    //     // console.log("ok");
    //     return next()
    // }
    // res.status(404).json({
    //     success: false,
    //     message: 'otp not mach',
    // });




}
module.exports = {
    sendotp,
    veryfeotp
}