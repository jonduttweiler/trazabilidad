import { Collection, Db, MongoClient } from "mongodb";
import { EPCISEvent, ObjectEvent, TransformationEvent } from "../types";
import events from "events";
import EventEmitter from "events";
import { EventsService } from "./EventsService";
//const url = 'mongodb://127.17.0.2:27017';

export class MongoDBEventsService extends EventsService{
    db: Db | undefined
    events: EventEmitter
    eventsCollection: Collection | undefined

    //this should have a connection, and implement outputFrom using it
    //we should use mongoose or not?
    constructor({ url, dbName }: { url: string, dbName: string }) { //Podria recibir directamente la collection
        super();

        // Connection URL
        const client = new MongoClient(url);
        const eventEmitter = new events.EventEmitter();
        this.events = eventEmitter;

        (async () => {
            try {
                await client.connect();
                const db = client.db(dbName);
                this.db = db;
                this.eventsCollection = db.collection("events");
                eventEmitter.emit("connected");
            } catch (err) {
                console.log(err);
            }
        })();

    }

    on(eventName: string, handler: (...args: any[]) => void) {
        this.events.on(eventName, handler);
    }

    async addEvent(event: EPCISEvent): Promise<void> {
        if (!this.eventsCollection) return;

        await this.eventsCollection.insertOne(event);
        console.log("added")

    }


    async ouputFrom(...epcIds: string[]): Promise<EPCISEvent[]> {
        //What i need to do here is get events when kind of some type and epc in ouput
        //or when object, and in epc list
        const collection = await this.eventsCollection; //Why this is a promise?
        if (!collection) return [];

        const cursor = collection.find({
            $or: [
                { $and: [{ kind: "TransformationEvent" }, { outputEPCList: { $in: epcIds } }] },
                { $and: [{ kind: "ObjectEvent" }, { epcList: { $in: epcIds } }] },
            ]
        });
        return await cursor.toArray() as unknown as EPCISEvent[];
    }
}