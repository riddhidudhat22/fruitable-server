const jwt = require('jsonwebtoken');
const Users = require('../model/users.model');

const auth = (roles = []) => async (req, res, next) => {
    try {
        const token = req.cookies.AccessToken || req.headers["Authorization"]?.replace("Beareer ", "")
        // console.log(token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token required"
            })
        }

        try {
            const validatetoken = await jwt.verify(token, process.env.ACESS_TOKEN)
            console.log("aaaaa", validatetoken);

            const user = await Users.findById(validatetoken._id)
            console.log(user, roles);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "user not found"
                })
            }

            if (!roles.some((v) => v === user.role)) {
                return res.status(400).json({
                    success: false,
                    message: "You have not access"
                })
            }
            console.log("okk");

            req.user=user
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid token" + error.message
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error" + error.message
        })
    }
}

module.exports = {
    auth
}