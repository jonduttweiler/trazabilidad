import express from "express";

import {
  MongoDBEventsService,
  MongoDBEventsServiceBuilder,
} from "./services/MongoDBEventsService";
import { TraceService } from "./services/TraceService";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let traceService: TraceService;

(async function () {
  const serviceBuilder = new MongoDBEventsServiceBuilder({
    url: "mongodb://172.17.0.2:27017",
    dbName: "demo",
  });
  const meService: MongoDBEventsService = await serviceBuilder.create();
  console.log("connected!");
  traceService = new TraceService(meService);
})();

app.get("/trace/:id", async (req, res, next) => {
  const traceId = req.params.id;
  if (traceService) {
    const trace = await traceService.trace(traceId);
    if (trace) {
      res.json(trace);
    } else {
      res.status(404).json({ message: `Trace ${traceId} not found` });
    }
  } else {
    res.status(500).json({ message: `Trace service is not running` });
  }
});

export default app;
