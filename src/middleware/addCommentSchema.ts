import * as joi from 'joi';

export const addCommentSchema = joi.object({
  description: joi.string().min(3).max(600).required(),
  owner: joi.alternatives(
    joi.string().alphanum().required(),
    joi.number().required(),
  ),
  alert: joi.string().alphanum().required(),
});
