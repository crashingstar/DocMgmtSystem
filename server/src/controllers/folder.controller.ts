import { Request, Response } from "express";
import folderRepository from "../repositories/folder.repository";
import { Folder } from "../model/folder";
import { folderSchema } from "../schemas/folder.schema";

const insertFolder = (req: Request, res: Response) => {
  const folder: Folder = req.body;

  const { error } = folderSchema.validate(folder);
  if (error) {
    res.status(400).json({ error: error.details });
  }
  folderRepository
    .addFolder(folder)
    .then((result) => {
      res.status(201).send({
        message: "Folder successfully created",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err,
      });
    });
};

const getFolder = (req: Request<{ folder_id: string }>, res: Response) => {
  const params = req.params;

  if (!params.folder_id) {
    res.status(400).json({
      message: "BAD REQUEST",
      error: "Missing folder id",
    });
  }
  folderRepository
    .getOne(params.folder_id)
    .then((result) => {
      // .then for async call
      res.status(200).send({
        message: "Folder successfully retrive",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err,
      });
    });
};
export default { insertFolder, getFolder };
