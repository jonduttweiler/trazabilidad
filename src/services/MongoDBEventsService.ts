import { MongoClient } from "mongodb";
import { EPCISEvent, ObjectEvent, TransformationEvent } from "../types";

//const url = 'mongodb://127.17.0.2:27017';

export class MongoDBEventsService {
    //this should have a connection, and implement outputFrom using it
    //we should use mongoose or not?
    constructor({ url, dbName }: { url: string, dbName: string }) {
        // Connection URL
        const client = new MongoClient(url);
        (async function () {
            try {
                console.log("connecting...")
                await client.connect();
                const db = client.db(dbName);
                console.log("Connected! - fetching events");
                const events = db.collection("events");
                const fEvents = await events.find({}).toArray();
                console.log(fEvents);


            } catch (err) {
                console.log(err);
            }
        })();

    }


    ouputFrom(...epcIds: string[]): EPCISEvent[] {
        /*   return this.events.filter(event => {
              if (event.kind === "TransformationEvent") {
                  const te = event as TransformationEvent;
                  return te.outputEPCList?.some(outputProduct => epcIds.includes(outputProduct));
              } else if (event.kind === 'ObjectEvent') {
                  const te = event as ObjectEvent;
                  const includes = te.action === "ADD" && te.epcList?.some(outputProduct => epcIds.includes(outputProduct));
                  return includes;
              }
          }) */
        return [];

    }
}