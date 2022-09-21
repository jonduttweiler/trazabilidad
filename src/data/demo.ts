import assert from 'node:assert/strict';
import { EPCISEvent, ObjectEvent, TransformationEvent } from "../types"
import events from "./data";


function trace(ids: string[]): EPCISEvent[] {
    const processedEvents = new Set<EPCISEvent>(); ///Array de eventos
    let inputs = ids; //Ver si es un array o no

    while(inputs.length > 0){
        const from: EPCISEvent[] = ouputFrom(...inputs);
        inputs = from.map(ef => {
            if (ef.kind === "TransformationEvent") {
                const te = ef as TransformationEvent;
                return te.inputEPCList;
            }
        }).flat().filter(input => input != undefined) as string[]; //Remove undefined values
    
        from.forEach(event => processedEvents.add(event));
    }

    return Array.from(processedEvents);
}


/* Devuelve un conjunto de eventos de los cuales el producto es salida. Extenderlo a un array de productos */
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

console.log(
    trace(["[L:2124|P:20200824124003267|Vto:24/08/2022]"])
)

//console.log(ouputFrom("[L:2124|P:20200824124003267|Vto:24/08/2022]"))

/*
console.log(
    ouputFrom("8838 P:20200804115529837 P:1 Vto:02/10/2021",
              "6789 [L:2068|P:20200319165609010|Vto:19/03/2022]",
              "6790 [L:2068|P:20200319165609010|Vto:19/03/2022]"
              )
)
 */


//Asserts acerca del trace length
//console.log(trace("[L:2124|P:20200824124003267|Vto:24/08/2022]"))
/* assert.deepEqual(
    trace("[L:2124|P:20200824124003267|Vto:24/08/2022]").length,
    5
) */

/* 

    [L:2124|P:20200824124003267|Vto:24/08/2022]

*/