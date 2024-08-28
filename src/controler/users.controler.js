
const Users = require("../model/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendmailer = require("../utils/nodemailers");
const createpdf = require("../utils/pdfmake");
const pdfcreate = require("../utils/pdfmake");
const exportpdfmake = require("../utils/pdfmake");

const Tokenaccess = async (_id) => {
    const user = await Users.findById(_id);

    console.log(user);

    const accessToken = await jwt.sign({
        _id: user._id,
        role: user.role,
        expiresIn: 36000000
    },
        process.env.ACESS_TOKEN,
        { expiresIn: 60 * 60 });


    const refreshtoken = await jwt.sign({
        _id: user._id
    },
        process.env.REFRESH_TOKEN,
        { expiresIn: 36000 });

    user.refreshtoken = refreshtoken
    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshtoken }

}

const ragister = async (req, res) => {
    console.log("ragister", req.body);
    try {
        console.log("saaas", req.body);
        console.log(req.file);

        const { email, password } = req.body
        const user = await Users.findOne(
            { $or: [{ email }] }
        )
        console.log('jjjjjj', user);

        if (user) {
            return res.status(409).json({
                success: false,
                message: "user alredy exist"
            })
        }
        // console.log(user);


        const hashassword = await bcrypt.hash(password, 10);
        console.log(hashassword);

        if (!hashassword) {
            return res.status(409).json({
                message: "password not match",
                success: false
            })
        }
        const dataf = await Users.create({ ...req.body, password: hashassword })
        // const dataf = await Users.create({ ...req.body, password: hashassword,avtar:req.file.path })
        if (!dataf) {
            res.status(500).json({
                success: false,
                message: "create hash password error"
            })
        }

        const user1 = await Users.findById({ _id: dataf._id }).select('-password');

        if (!user1) {
            return res.status(500).json({
                success: false,
                message: "internal server error" + error.message
            })
        }
        // sendmailer()

        res.status(200).json({
            success: true,
            message: "ragister succesfully",
            data: user1
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const ragisterotp = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "ragister otp succsessfully send."

    })
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log("fffffffffffffff", email, password);

        const user = await Users.findOne(
            { $or: [{ email }] }
        );

        console.log(user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not exist"
            })
        }
        console.log(password, user.password);

        const validateUser = await bcrypt.compare(password, user.password)
        console.log(validateUser);

        if (!validateUser) {
            return res.status(401).json({
                success: false,
                message: "password incorect"
            })
        }

        const { accessToken, refreshtoken } = await Tokenaccess(user._id)
        console.log(accessToken, "sfssf", refreshtoken);

        const user1 = await Users.findById({ _id: user._id }).select('-password -refreshtoken');

        const optionaccess = {
            httpOnly: true,
            sequre: true,
            maxAge: 36000000,
            sameSite: "None"
        }
        const optionrefres = {
            httpOnly: true,
            sequre: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "None"
        }
        res.status(200)
            .cookie("AccessToken", accessToken, optionaccess)
            .cookie("refreshtoken", refreshtoken, optionrefres)
            .json({
                success: true,
                message: "data fetch successfull",
                data: { ...user1.toObject(), accessToken }
            })

    } catch (error) {
        console.log(error);
    }
}

const newtoken = async (req, res) => {
    // console.log(req.body);

    try {
        console.log("body++", req.cookies.refreshtoken);

        const validateToken = await jwt.verify(req.cookies.refreshtoken, process.env.REFRESH_TOKEN)
        console.log("uuu", validateToken);

        if (!validateToken) {
            return res.status(401).json({
                success: false,
                message: "invalid refresh token."
            })
        }

        const user = await Users.findById(validateToken._id)
        console.log(user, "ajikshd");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user is not found."
            })
        }




        if (req.cookies.refreshtoken != user.toObject().refreshtoken) {
            return res.status(401).json({
                success: false,
                message: "invalid Token."
            })
        }
        const { accessToken, refreshtoken } = await Tokenaccess(user._id)

        const option = {
            httpOnly: true,
            sequre: true,
            sameSite: "None",
            // maxAge: 60 * 60 * 24
        }

        res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshtoken", refreshtoken, option)
            .json({
                success: true,
                message: "Refresh Token Sucessfully",
                data: {
                    accessToken
                }
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr", req.body.id);
        const user = await Users.findByIdAndUpdate(
            req.body._id,
            {
                $unset: {
                    refreshtoken: 1
                }
            },
            {
                new: true
            }
        )
        console.log(user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not logout"
            })
        }

        res.status(200)
            .clearCookie("AccessToken")
            .clearCookie("refreshtoken")
            .json({
                success: true,
                message: "logout successfull",

            })
    } catch (error) {
        return res.status(500)
            // .clearCoockie("AccessToken")
            .json({
                success: false,
                message: "Internal server error: " + error.message
            })

    }
}

const authcheck = async (req, res) => {
    try {
        const accessToken = req.cookies.AccessToken
        console.log("accessToken", accessToken);

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "accesstoken not found"
            })
        }

        const verifytoken = await jwt.verify(accessToken, process.env.ACESS_TOKEN)
        console.log('verifytoken', verifytoken);

        if (!verifytoken) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User Authenticated",
            data: verifytoken
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })
    }
}

module.exports = {
    ragister,
    login,
    newtoken,
    logout,
    ragisterotp,
    authcheck,
    Tokenaccess
}