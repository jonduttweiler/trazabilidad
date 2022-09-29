import express from "express";
import path from "path";
import { loadApiEndpoints } from "./controllers/api";
import { MongoDBEventsService, MongoDBEventsServiceBuilder } from "./services/MongoDBEventsService";
import TransactionService from "./services/TransactionService";

import { generateEvents } from "./generators/event-generator";

import { events } from "./data/test";
import { EPCISEvent } from "./types";




/* 

(async function () {
  const serviceBuilder = new MongoDBEventsServiceBuilder({
    url: "mongodb://172.17.0.2:27017",
    dbName: "demo"
  });
  const meService: MongoDBEventsService = await serviceBuilder.create();
  console.log("connected!");

  generateEvents(1000000, async (event) => {
    console.log("event callback")
    try{
      const eevent = event as EPCISEvent;
      await meService.addEvent(eevent)
      console.log(`${eevent.eventId} added`);
    } catch(err){
      console.log(err);
    }
  });
})(); */
 
// Create Express server
const app = express();
const txService = new TransactionService();
//console.log(txService.searchRimp("RIMP-0000-00000062"))

/**/

/* eventsService.on("connected", async () => {
  console.log('searching...');
  const result = await eventsService.ouputFrom("FA01");
  console.log(result)
})
 */
/* //await client.connect
setTimeout(() => {
  events.forEach((event) => {
    mongoDBEventsService.addEvent(event);
  })
  
},4000) */



// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;
