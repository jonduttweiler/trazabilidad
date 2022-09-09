import express from "express";
import path from "path";
import { EPCISEvent, ObjectEvent } from "./types"
import { loadApiEndpoints } from "./controllers/api";


const event: ObjectEvent = {
  action: "OBSERVE",
  eventTime: new Date().toISOString(),
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  eventId: "123",
  bizLocation: "Coopsol Deposito (GLN)",
  epcList: ["SGTIN1", "SGTIN2", "SGTIN3"]
}

console.log(event)

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;
