import { Request, Response } from "express";
import folderRepository from "../repository/folder.repository";
import { Folder } from "../model/folder";

const getAll = (req: Request, res: Response) => {
  folderRepository
    .selectAll()
    .then((folders) => {
      // .then for async call
      res.status(200).send({
        message: "OK",
        result: folders,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err.code,
      });
    });
};

const insertFolder = (req: Request, res: Response) => {
  const folder: Folder = req.body;
  folderRepository
    .addFolder(folder)
    .then((result) => {
      // .then for async call
      res.status(201).send({
        message: "Folder successfully created",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err.code,
      });
    });
};
export default { getAll, insertFolder };
