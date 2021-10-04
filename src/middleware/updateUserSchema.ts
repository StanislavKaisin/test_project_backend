import * as joi from 'joi';

const phoneNumberJoi = joi.extend(require('joi-phone-number'));

export const updateUserSchema = joi.object().keys({
  name: joi.string().min(3).max(30).allow(null, ''),
  password: joi.string().allow(null, '').alphanum().min(3).max(30),
  email: joi.string().email().allow(null, ''),
  phone: phoneNumberJoi
    .string()
    .phoneNumber({ defaultCountry: 'UA', format: 'international' })
    .allow(null, ''),
  viber: phoneNumberJoi
    .string()
    .allow(null, '')
    .phoneNumber({ defaultCountry: 'UA', format: 'international' })
    .allow(null, ''),
  //'+32 494 32 24 56',
  address: joi.string().allow(null, '').alphanum().min(10).max(100),
});
