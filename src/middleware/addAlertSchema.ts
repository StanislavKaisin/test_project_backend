import * as joi from 'joi';
const phoneNumberJoi = joi.extend(require('joi-phone-number'));

export const addAlertSchema = joi.object({
  title: joi.string().min(3).max(600).required(),
  description: joi.string().min(3).max(600).allow(null, ''),
  phone: phoneNumberJoi
    .string()
    .allow(null, '')
    .phoneNumber({ defaultCountry: 'UA', format: 'international' }),
  viber: phoneNumberJoi
    .string()
    .allow(null, '')
    .phoneNumber({ defaultCountry: 'UA', format: 'international' }),
  //'+32 494 32 24 56'
  address: joi.string().allow(null, '').min(10).max(100),
  // required for backend validation
  owner: joi.string().alphanum().required(),
  file: joi.any().allow(null, ''),
  searchForOwner: joi.boolean().allow(null, ''),
  phoneCountry: joi.string().allow(null, ''),
  viberCountry: joi.string().allow(null, ''),
});
