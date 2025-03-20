import express, { Express } from "express";
const app: Express = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
