import * as joi from 'joi';

const phoneNumberJoi = joi.extend(require('joi-phone-number'));

export const createUserSchema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().alphanum().min(3).max(30).required(),
  email: joi.string().email().required(),
  phone: phoneNumberJoi
    .string()
    .phoneNumber({ defaultCountry: 'UA', format: 'international' })
    .required(),
  viber: phoneNumberJoi
    .string()
    .allow(null, '')
    .phoneNumber({ defaultCountry: 'UA', format: 'international' })
    //'+32 494 32 24 56'
    .required(),
  address: joi.string().allow(null, '').alphanum().min(10).max(100),
});
