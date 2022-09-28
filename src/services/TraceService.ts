import { EPCISEvent, ObjectEvent, TransformationEvent } from "../types";
import { EventsService } from "./EventsService";

export class TraceService {
    eventsService : EventsService;
    
    constructor(eventsService: EventsService) {
        this.eventsService = eventsService;
    }


    trace(id: string): EPCISEvent[] {
        const processedEvents = new Set<EPCISEvent>(); //Array de eventos
        const processedInputs = new Set<string>();
        let inputs = [id]; //Ver si es un array o no

        while (inputs.length > 0) {
            const from: EPCISEvent[] = this.eventsService.ouputFrom(...inputs);
            console.log("From:",from)
            inputs.forEach(input => processedInputs.add(input));

            inputs = from.map(ef => {
                if (ef.kind === "TransformationEvent") {
                    const te = ef as TransformationEvent;
                    return te.inputEPCList;
                }
            }).flat().filter(input => input != undefined && !processedInputs.has(input)) as string[]; //Remove undefined values && avoid process products more than once

            from.forEach(event => processedEvents.add(event));
        }

        return Array.from(processedEvents);
    }
    
}