import express from "express";
import path from "path";
import { loadApiEndpoints } from "./controllers/api";
import TransactionService from "./services/TransactionService";

// Create Express server
const app = express();
const txService = new TransactionService();
//console.log(txService.searchRimp("RIMP-0000-00000062"))

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;
