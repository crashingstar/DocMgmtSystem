import * as Joi from "joi";
export const folderSchema = Joi.object({
  name: Joi.string().required(),
  owner_name: Joi.string().required(),
  parent_id: Joi.string().optional(),
});
