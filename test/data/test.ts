import { EPCISEvent, ObjectEvent, TransformationEvent } from "../../src/types";

const rimps = {

    "RIMP-0000-00000001": {
        productor: "productor 1",
        apiario: "apiario x"
    },
    "RIMP-0000-00000002": {
        productor: "productor 1",
        apiario: "apiario y"
    },
    "RIMP-0000-00000003": {
        productor: "productor 1",
        apiario: "apiario z"
    },
    "RIMP-0000-00000004": {
        productor: "productor 1",
        apiario: "apiario xx"
    },
    "RIMP-0000-00000005": {
        productor: "productor 2",
        apiario: "apiario xy"
    },
    "RIMP-0000-00000006": {
        productor: "productor 3",
        apiario: "apiario xz"
    },
    "RIMP-0000-00000007": {
        productor: "productor 0",
        apiario: "apiario xw"
    },
    "RIMP-0000-00000008": {
        productor: "productir 1",
        apiario: "apiario xx"
    },
    "RIMP-0000-00000009": {
        productor: "productor 2",
        apiario: "apiario xy"
    },
    "RIMP-0000-00000010": {
        productor: "productor 3",
        apiario: "apiario xz"
    }
}


const event1: ObjectEvent = { //Ingreso de tambor
    eventId: "event1",
    kind: "ObjectEvent",
    action: "ADD",
    eventTime: "10/12/2019 10:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    epcList: [
        "TA01",
    ],
    bizStep: "urn:epcglobal:cbv:bizstep:receiving",
    disposition: "urn:epcglobal:cbv:disp:active",
    bizTransactionList: [
        "RIMP-0000-00000001" //Rimp , productor1, apiario x
    ],
};

const event2: TransformationEvent = { //Fraccionado
    eventId: "event2",
    kind: "TransformationEvent",
    eventTime: new Date().toISOString(),
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "TA01",  //Tambor el event1
    ],
    outputEPCList: [ //Las trazas de cualquiera de estos deben ser iguales
        "FA01", //[384]  MO-EV450 Miel Organica Multiflora Wayra x 450g VIDRIO 
        "FA02", //[164] MO-EV250 Miel Organica Multifloral Wayra x 250 G. VIDRIO
        "FA03", //[130]MO-UNIDADES-EV440 Miel Orgánica Multifloral Wayra
    ]
}; //Fraccionado

const event3: ObjectEvent = { //Ingreso de tambor
    eventId: "event3",
    kind: "ObjectEvent",
    action: "ADD",
    eventTime: "10/12/2019 10:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    epcList: [
        "TA02", //tambor id
    ],
    bizStep: "urn:epcglobal:cbv:bizstep:receiving",
    disposition: "urn:epcglobal:cbv:disp:active",
    bizTransactionList: [
        "RIMP-0000-00000002" //Rimp , productor1, apiario x
    ],
};

const event4: TransformationEvent = { //Homogeneizado
    eventId: "event4",
    kind: "TransformationEvent",
    eventTime: "20/12/2019 11:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "TA02",
    ],
    outputEPCList: [
        "TA03",  //Tambor
        "TA04",  //Tambor
    ],

};
const event5: TransformationEvent = {
    eventId: "event5",
    kind: "TransformationEvent",
    eventTime: new Date().toISOString(),
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "TA03",  //Tambor
        "TA04",  //Tambor
    ],
    outputEPCList: [
        "FA04", //[384]  MO-EV450 Miel Organica Multiflora Wayra x 450g VIDRIO 
        "FA05", //[164] MO-EV250 Miel Organica Multifloral Wayra x 250 G. VIDRIO       
    ]
}; //Fraccionado

const event6: ObjectEvent = {
    eventId: "event6", //Ingreso alza
    kind: "ObjectEvent",
    action: "ADD",
    eventTime: "11/12/2019 11:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    epcList: [
        "A1", //Alza
    ],
    bizStep: "urn:epcglobal:cbv:bizstep:receiving",
    disposition: "urn:epcglobal:cbv:disp:active",
    bizTransactionList: [
        "RIMP-0000-00000003"
    ],
};

const event7: TransformationEvent = {//Extraccion
    eventId: "eventE1",
    kind: "TransformationEvent",
    eventTime: "14/12/2019 10:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "A1", //Alza
    ],
    outputEPCList: [
        "T1",
    ],

};
const event8: TransformationEvent = { //Homogeneizado
    eventId: "event8",
    kind: "TransformationEvent",
    eventTime: "20/12/2019 11:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "T1",  //Tambor
    ],
    outputEPCList: [
        "T2",  //Tambor
    ],

};
const event9: TransformationEvent = { //Fraccionado
    eventId: "event9",
    kind: "TransformationEvent",
    eventTime: new Date().toISOString(),
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "T2",  //Tambor
    ],
    outputEPCList: [
        "FA06", //[384]  MO-EV450 Miel Organica Multiflora Wayra x 450g VIDRIO 
        "FA07", //[164] MO-EV250 Miel Organica Multifloral Wayra x 250 G. VIDRIO
    ]
};
const event10: ObjectEvent = {
    eventId: "event10", //Ingreso alza
    kind: "ObjectEvent",
    action: "ADD",
    eventTime: "11/12/2019 11:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    epcList: [
        "A2", //Alza
    ],
    bizStep: "urn:epcglobal:cbv:bizstep:receiving",
    disposition: "urn:epcglobal:cbv:disp:active",
    bizTransactionList: [
        "RIMP-0000-00000004"
    ],
};
const event11: TransformationEvent = { //Extraccion
    eventId: "event11",
    kind: "TransformationEvent",
    eventTime: "14/12/2019 10:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "A2", //Alza
    ],
    outputEPCList: [
        "T3",

    ],

};
const event12: TransformationEvent = {//Homogeneizado
    eventId: "eventH1",
    kind: "TransformationEvent",
    eventTime: "20/12/2019 11:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "T3", "T5", "T6"
    ],
    outputEPCList: [
        "T4",
    ],

};

const event13: TransformationEvent = { //Fraccionado
    eventId: "event13",
    kind: "TransformationEvent",
    eventTime: new Date().toISOString(),
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "T4",
    ],
    outputEPCList: [
        "FA08", //[384]  MO-EV450 Miel Organica Multiflora Wayra x 450g VIDRIO 
        "FA09", //[164] MO-EV250 Miel Organica Multifloral Wayra x 250 G. VIDRIO

    ]
};
const event14: ObjectEvent = { //Ingreso de tambor
    eventId: "event14",
    kind: "ObjectEvent",
    action: "ADD",
    eventTime: "10/12/2019 10:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    epcList: [
        "T5", //tambor id
    ],
    bizStep: "urn:epcglobal:cbv:bizstep:receiving",
    disposition: "urn:epcglobal:cbv:disp:active",
    bizTransactionList: [
        "RIMP-0000-00000005" //Rimp , productor1, apiario x
    ],
};

const event15: ObjectEvent = { //Ingreso de tambor
    eventId: "event15",
    kind: "ObjectEvent",
    action: "ADD",
    eventTime: "10/12/2019 10:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    epcList: [
        "T6", //tambor id
    ],
    bizStep: "urn:epcglobal:cbv:bizstep:receiving",
    disposition: "urn:epcglobal:cbv:disp:active",
    bizTransactionList: [
        "RIMP-0000-00000006" //Rimp , productor1, apiario x
    ],
};

const event16: ObjectEvent = {
    eventId: "event16", //Ingreso alza
    kind: "ObjectEvent",
    action: "ADD",
    eventTime: "11/12/2019 11:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    epcList: [
        "A3", //Alza
    ],
    bizStep: "urn:epcglobal:cbv:bizstep:receiving",
    disposition: "urn:epcglobal:cbv:disp:active",
    bizTransactionList: [
        "RIMP-0000-00000007"
    ],
};
const event17: TransformationEvent = {
    eventId: "eventE1",
    kind: "TransformationEvent",
    eventTime: "14/12/2019 10:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "A3", //Alza
    ],
    outputEPCList: [
        "T7",
    ],

}; //Extraccion
const event18: ObjectEvent = {
    eventId: "event18", //Ingreso alza
    kind: "ObjectEvent",
    action: "ADD",
    eventTime: "11/12/2019 11:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    epcList: [
        "A4", //Alza
    ],
    bizStep: "urn:epcglobal:cbv:bizstep:receiving",
    disposition: "urn:epcglobal:cbv:disp:active",
    bizTransactionList: [
        "RIMP-0000-00000008"
    ],
};
const event19: TransformationEvent = {//Extraccion
    eventId: "eventE2",
    kind: "TransformationEvent",
    eventTime: "14/12/2019 11:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "A4", //Alza
    ],
    outputEPCList: [
        "T8",
    ],

};
const event20: TransformationEvent = { //Homogeneizado
    eventId: "eventH1",
    kind: "TransformationEvent",
    eventTime: "20/12/2019 11:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "T7",
        "T8",
        "T10",
        "T11"
    ],
    outputEPCList: [
        "T9",
    ],
};

const event21: TransformationEvent = {//Fraccionado
    eventId: "eventF1",
    kind: "TransformationEvent",
    eventTime: new Date().toISOString(),
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: [
        "T9",
    ],
    outputEPCList: [
        "FA10",//[384]  MO-EV450 Miel Organica Multiflora Wayra x 450g VIDRIO 
        "FA11",//[164] MO-EV250 Miel Organica Multifloral Wayra x 250 G. VIDRIO
        "FA12",//[130]MO-UNIDADES-EV440 Miel Orgánica Multifloral Wayra    
    ]
};

const event22: ObjectEvent = { //Ingreso de tambor
    eventId: "event22",
    kind: "ObjectEvent",
    action: "ADD",
    eventTime: "10/12/2019 10:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    epcList: [
        "T10", //tambor id
    ],
    bizStep: "urn:epcglobal:cbv:bizstep:receiving",
    disposition: "urn:epcglobal:cbv:disp:active",
    bizTransactionList: [
        "RIMP-0000-00000009" //Rimp , productor1, apiario x
    ],
}; //Ingreso tambor  
const event23: ObjectEvent = { //Ingreso de tambor
    eventId: "event23",
    kind: "ObjectEvent",
    action: "ADD",
    eventTime: "10/12/2019 10:05:12",
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    epcList: [
        "T11", //tambor id
    ],
    bizStep: "urn:epcglobal:cbv:bizstep:receiving",
    disposition: "urn:epcglobal:cbv:disp:active",
    bizTransactionList: [
        "RIMP-0000-00000010" //Rimp , productor1, apiario x
    ],
};


export const events: EPCISEvent[] = [
    event1,
    event2,
    event3,
    event4,
    event5,
    event6,
    event7,
    event8,
    event9,
    event10,
    event11,
    event12,
    event13,
    event14,
    event15,
    event16,
    event17,
    event18,
    event19,
    event20,
    event21,
    event22,
    event23
]