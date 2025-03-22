import { Router } from "express";
import folderController from "./controller/folder.controller";
import documentController from "./controller/document.controller";

const routes = Router();

routes.get("/folder", folderController.getAll);
routes.post("/folder", folderController.insertFolder);
routes.get("/document", documentController.getAll);
routes.post("/document", documentController.insertDocument);

export default routes;
