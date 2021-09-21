import * as joi from 'joi';

export const addAlertSchema = joi.object({
  name: joi.string().alphanum().min(3).max(10).allow(null, ''),
  description: joi.string().alphanum().min(3).max(600).required(),
  // required for backend validation
  userId: joi.string().alphanum().required(),
  alertId: joi.string().alphanum().required(),
});
