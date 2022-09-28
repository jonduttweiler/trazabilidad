import express from "express";
import path from "path";
import { loadApiEndpoints } from "./controllers/api";
import { MongoDBEventsService } from "./services/MongoDBEventsService";
import TransactionService from "./services/TransactionService";

// Create Express server
const app = express();
const txService = new TransactionService();
//console.log(txService.searchRimp("RIMP-0000-00000062"))

const mongoDBEventsService = new MongoDBEventsService({
  url: "mongodb://172.17.0.2:27017",
  dbName: "demo"
});



// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;
