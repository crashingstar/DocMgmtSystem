import { Router } from "express";
import folderController from "./controllers/folder.controller";
import documentController from "./controllers/document.controller";

const routes = Router();

// routes.get("/folder", folderController.getAll);
routes.post("/folder", folderController.insertFolder);
routes.get("/folder/:folder_id", folderController.getFolder);
routes.get("/document", documentController.getAll);
routes.post("/document", documentController.insertDocument);

export default routes;
