import { Collection, Db, MongoClient } from "mongodb";

import { EPCISEvent } from "../types";
import { EventsService } from "./EventsService";

export class MongoDBEventsServiceBuilder {
  url: string;
  dbName: string;

  constructor({ url, dbName }: { url: string; dbName: string }) {
    this.url = url;
    this.dbName = dbName;
  }

  async create(): Promise<MongoDBEventsService> {
    const client = new MongoClient(this.url);
    await client.connect();
    const db = client.db(this.dbName);
    return new MongoDBEventsService(db, db.collection("events"));
  }
}

export class MongoDBEventsService extends EventsService {
  db: Db;
  events: Collection;

  constructor(db: Db, collection: Collection) {
    super();
    this.db = db;
    this.events = collection;
  }

  async addEvent(event: EPCISEvent): Promise<void> {
    await this.events.insertOne(event);
    console.log("added");
  }

  ouputFrom(...epcIds: string[]): Promise<EPCISEvent[]> {
    const cursor = this.events.find({
      $or: [
        {
          $and: [
            { kind: "TransformationEvent" },
            { outputEPCList: { $in: epcIds } },
          ],
        },
        { $and: [{ kind: "ObjectEvent" }, { epcList: { $in: epcIds } }] },
      ],
    });

    return cursor.toArray() as unknown as Promise<EPCISEvent[]>;
  }
}
