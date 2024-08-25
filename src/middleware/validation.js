const Joi = require("joi");
const pick = require("../helper/helper");

const validation = (schema) => (req, res, next) => {
    console.log(schema);
    console.log(Object.keys(schema));

    const obj = pick(req, Object.keys(schema))
    console.log('ax',obj);

    const { error, value } = Joi.compile(schema)
        .prefs({
            abortEarly: false
        })
        .validate(obj)


    if (error) {
        const errormsg = error.details.map((v) => v.message).join(", ")
        console.log(errormsg);
        return next(new Error("validation Error.."+errormsg))
   
      

    }
    Object.assign(req,value)

    next();
}


module.exports = {
    validation
}


















// const Joi = require("joi");
// const pick = require("../helper/helper");

// const validation = (schema) => (req, res, next) => {
//     console.log(schema);
//     console.log(Object.keys(schema));

//     const obj = pick(req, Object.keys(schema));
//     console.log(obj);

//     const { error, value } = Joi.compile(schema)
//         .prefs({
//             abortEarly: false
//         })
//         .validate(obj);

//     if (error) {
//         const errormsg = error.details.map((v) => v.message).join(", ");
//         return res.status(400).json({ error: errormsg });
//     }

//     next();
// };

// module.exports = {
//     validation
// };