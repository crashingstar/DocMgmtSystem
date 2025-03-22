import { Request, Response } from "express";
import documentRepository from "../repository/document.repository";
import { Document } from "../model/document";

const insertDocument = (req: Request, res: Response) => {
  const document: Document = req.body;
  documentRepository
    .addDocument(document)
    .then((result) => {
      // .then for async call
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
  documentRepository
    .selectAll()
    .then((documents) => {
      // .then for async call
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
