const Joi =require("joi")


const getcategory={
    query:Joi.object().keys({ 
        cat_id:Joi.string().required()
    })
}
const createcategory={
    body:Joi.object().keys({ 
            name:Joi.string().required().uppercase().trim(),
            description:Joi.string().required(),
            image:Joi.string().allow(' ')    
    })
}

const updatecategory={
    body:Joi.object().keys({ 
            name:Joi.string().required().uppercase().trim(),
            description:Joi.string().required(),
            image:Joi.string().allow(' ')    
    }),
    params:Joi.object().keys({ 
        categori_id:Joi.string().required()
    })
}

const deletecategory={
    params:Joi.object().keys({ 
        categori_id:Joi.string().required()
    })
}
module.exports={
    createcategory,
    updatecategory,
    deletecategory,
    getcategory
}





