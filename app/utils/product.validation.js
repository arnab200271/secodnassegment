const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name should be at least 3 characters'
    }),
    category: Joi.string().required().messages({
        'string.empty': 'Category is required'
    }),
    description: Joi.string().min(10).required().messages({
        'string.empty': 'Description is required',
        'string.min': 'Description should be at least 10 characters'
    }),
    image: Joi.string().required().messages({
        'string.empty': 'Product image is required'
    })
});

module.exports = productSchema; 