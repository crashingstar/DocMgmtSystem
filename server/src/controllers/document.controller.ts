import { Request, Response } from "express";
import documentRepository from "../repositories/document.repository";
import { Document } from "../model/document";
import { documentSchema } from "../schemas/document.schema";

const insertDocument = (req: Request, res: Response) => {
  const document: Document = req.body;

  const { error } = documentSchema.validate(document);
  if (error) {
    res.status(400).json({ error: error.details });
  }
  documentRepository
    .addDocument(document)
    .then((result) => {
      res.status(201).send({
        message: "Document successfully created",
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

const getAll = (req: Request, res: Response) => {
  const folder_id = req.query?.folder_id;
  // get all documents and folders either in the root or in specific folder
  documentRepository
    .selectAll(folder_id as string)
    .then((documents) => {
      res.status(200).send({
        message: "OK",
        result: documents,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err.code,
      });
    });
};
export default { getAll, insertDocument };
