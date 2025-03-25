// import needed libraries
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import * as cors from "cors";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.PORT || 3001;

app.use("/api", routes);
// starts the server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
