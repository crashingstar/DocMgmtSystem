import * as Joi from "joi";
export const documentSchema = Joi.object({
  name: Joi.string().required(),
  file_size: Joi.number().required(),
  owner_name: Joi.string().required(),
  folder_id: Joi.string().optional(),
});
