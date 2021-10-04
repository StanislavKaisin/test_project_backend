import * as joi from 'joi';

export const addCommentSchema = joi.object({
  description: joi.string().min(3).max(600).required(),
  owner: joi.string().alphanum().required(),
  alert: joi.string().alphanum().required(),
});
