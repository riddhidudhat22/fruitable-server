// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: "dvsblqghc",
    api_key: process.env.CLOUDNARY_KEY,
    api_secret: process.env.CLOUDNARY_SIKRET_KEY // Click 'View Credentials' below to copy your API secret
});

const updatefile = async (localpath, foldername) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(localpath, {
            folder: foldername
        }).catch((error) => { console.log(error) });

        // console.log(uploadResult);
        return uploadResult
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    updatefile
}