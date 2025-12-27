import joi from 'joi';

const userSchema = joi.object({
    username:joi.string().required(),
    email:joi.string().email().required(),
    password: joi.string().min(5).required()
})

const index = {
    userSchema,
}
export default index