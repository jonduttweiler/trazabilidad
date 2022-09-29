const { Console } = require("console");

console.log("event generator");


let rimp_curr = 1;
function generateRimp(prefix = "RIMP") {
    const rimp = `${prefix || ""}-0000-${rimp_curr.toString().padStart(8, '0')}`
    rimp_curr++;

    return rimp;
}

let id_curr = {};
function generateId(prefix) {
    if (!id_curr[prefix]) id_curr[prefix] = 1;
    const id = `${prefix || ""}-0000-${id_curr[prefix].toString().padStart(8, '0')}`
    id_curr[prefix]++;
    return id;
}


for (let i = 0; i < 1000000;) {
    const it_events = []; //eventes generated in this interaction

    //Generate a start date and place events to relative this
    //Para los ingresos hay que generar un rimp, c/datos del prod y del apiario

    const tamboresExtraccionIds = [];
    const tamboresIngresoIds = [];
    let ingresoAlzaFlag = false;
    //No todos los lotes arrancan con un ingreso de alza

    if (Math.random() > 0.5) {
        //Generar entre una 1 y 3 alzas
        const alzasAmount = Math.ceil(Math.random() * 3);
        const alzasIds = [];
        for (let j = 0; j < alzasAmount; j++) {
            alzasIds.push(generateId("A"));
        }

        //generar entre 1 y tres tambores como resultado de extraccion
        const tamboresExtraccionAmount = Math.ceil(Math.random() * 3);
        for (let j = 0; j < tamboresExtraccionAmount; j++) {
            tamboresExtraccionIds.push(generateId("T"));
        }
        const e0 = ingresoAlza(generateId(`IA`), alzasIds, "11/12/2019 11:05:12", [generateRimp()]);
        it_events.push(e0);;

        const e01 = extraccion(generateId(`EA`), alzasIds, tamboresExtraccionIds, "11/12/2019 18:07:12");
        it_events.push(e01);

        ingresoAlzaFlag = true;
    }

    if (!ingresoAlzaFlag || ingresoAlzaFlag && Math.random() > 0.5){

        //Tampoco todos van a tener un ingreso de tambor
        const tamboresIngresoAmount = Math.ceil(Math.random() * 3);

        for (let j = 0; j < tamboresIngresoAmount; j++) {
            tamboresIngresoIds.push(generateId("T"));
        }

        const e1 = ingresoTambor(generateId("IT"), tamboresIngresoIds, "10/12/2020 12:05:12", [generateRimp()]);
        it_events.push(e1);

    }



    //Al homogeneizado hacemos que entren los tambores que salen de extraccion y los que ingersan directamente
    const input = tamboresExtraccionIds.concat(tamboresIngresoIds);
    const outputH = Array.apply(null, Array(input.length)).map((x, i) => { return generateId("T"); })
    const e2 = homogeneizado(generateId("HO"), input, outputH, "15/12/2020 12:05:12");
    it_events.push(e2);

    const outputF = Array.apply(null, Array(Math.ceil(Math.random() * 5))).map((x, i) => { return generateId("F"); })
    const e3 = fraccionado(generateId(`FR`), outputH, outputF, "16/12/2019 13:05:12");
    it_events.push(e3);

    //console.log(it_events);
    i += it_events.length;
    console.log(i)

}

//console.log(it_events)



/* 


 */
//100ms -> 1 day
function ingresoAlza(eventId, epcList, eventTime, bizTransactionList) {
    return {
        eventId: eventId, //Ingreso alza
        kind: "ObjectEvent",
        action: "ADD",
        eventTime: eventTime,
        recordTime: new Date().toISOString(),
        eventTimeZoneOffset: "-3:00",
        epcList: epcList,
        bizStep: "urn:epcglobal:cbv:bizstep:receiving",
        disposition: "urn:epcglobal:cbv:disp:active",
        bizTransactionList: bizTransactionList
    };

}
function ingresoTambor(eventId, epcList, eventTime, bizTransactionList) {
    return { //Ingreso de tambor
        eventId: eventId,
        kind: "ObjectEvent",
        action: "ADD",
        eventTime: eventTime,
        recordTime: new Date().toISOString(),
        eventTimeZoneOffset: "-3:00",
        epcList: epcList,
        bizStep: "urn:epcglobal:cbv:bizstep:receiving",
        disposition: "urn:epcglobal:cbv:disp:active",
        bizTransactionList: bizTransactionList,
    };
}

function extraccion(eventId, inputEPCList, outputEPCList, eventTime, bizTransactionList) {
    return {//Extraccion
        eventId: eventId,
        kind: "TransformationEvent",
        eventTime: eventTime,
        recordTime: new Date().toISOString(),
        eventTimeZoneOffset: "-3:00",
        inputEPCList: inputEPCList,
        outputEPCList: outputEPCList,
        bizTransactionList: bizTransactionList || []

    };
}


function homogeneizado(eventId, inputEPCList, outputEPCList, eventTime, bizTransactionList) {
    return { //Homogeneizado
        eventId: eventId,
        kind: "TransformationEvent",
        eventTime: eventTime,
        recordTime: new Date().toISOString(),
        eventTimeZoneOffset: "-3:00",
        inputEPCList: inputEPCList,
        outputEPCList: outputEPCList,
        bizTransactionList: bizTransactionList || []

    };

}
function fraccionado(eventId, inputEPCList, outputEPCList, eventTime, bizTransactionList) {
    return { //Fraccionado
        eventId: eventId,
        kind: "TransformationEvent",
        eventTime: eventTime,
        recordTime: new Date().toISOString(),
        eventTimeZoneOffset: "-3:00",
        inputEPCList: inputEPCList,
        outputEPCList: outputEPCList,
        bizTransactionList: bizTransactionList || []
    };
}