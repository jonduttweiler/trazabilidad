import { EPCISEvent, ObjectEvent, TransformationEvent } from "./types";
import { events } from "./data/test";

export function trace(id: string): EPCISEvent[] {
    const processedEvents = new Set<EPCISEvent>(); //Array de eventos
    const processedInputs = new Set<string>();
    let inputs = [id]; //Ver si es un array o no

    while(inputs.length > 0){
        const from: EPCISEvent[] = ouputFrom(...inputs);
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


/* Devuelve un conjunto de eventos de los cuales el producto es salida.*/
function ouputFrom(...epcIds: string[]): EPCISEvent[] {
    return events.filter(event => {
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

