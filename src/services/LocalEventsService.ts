import { EPCISEvent, ObjectEvent, TransformationEvent } from "../types";
import { EventsService } from "./EventsService";

export class LocalEventsService extends EventsService {
    events: EPCISEvent[];

    constructor(events: EPCISEvent[]) {
        super();
        this.events = events;
    }

    ouputFrom(...epcIds: string[]): EPCISEvent[] {
        return this.events.filter(event => {
            if (event.kind === "TransformationEvent") {
                const te = event as TransformationEvent;
                return te.outputEPCList?.some(outputProduct => epcIds.includes(outputProduct));
            } else if (event.kind === 'ObjectEvent') {
                const te = event as ObjectEvent;
                const includes = te.action === "ADD" && te.epcList?.some(outputProduct => epcIds.includes(outputProduct));
                return includes;
            }
        })

    }
}