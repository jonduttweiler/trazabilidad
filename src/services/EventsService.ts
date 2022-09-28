import { EPCISEvent } from "../types";

export class EventsService {
    ouputFrom(...epcIds: string[]): Promise<EPCISEvent[]> {
        throw new Error("Method not implemented.");
    }

    addEvent(event: EPCISEvent): void {
        throw new Error("Method not implemented.");
    }
    
}

