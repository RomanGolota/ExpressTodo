import Joi from '@hapi/joi';

const validate = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(255).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        console.log('Validation middleware error')
        return res.status(400).json({ error: error.details });
    }
    next();
};

export default validate