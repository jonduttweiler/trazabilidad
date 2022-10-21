import { ObjectEvent, TransformationEvent } from "../../src/types";

const RIMPS = {
  "RIMP-0000-00000001": {
    productor: "Productor A",
    apiario: {
      nombre: "A1",
      geolocation: [],
    },
  },
  "RIMP-0000-00000002": {
    productor: "Productor B",
    apiario: {
      nombre: "B1",
      geolocation: [],
    },
  },
  "RIMP-0000-00000003": {
    productor: "Productor B",
    apiario: {
      nombre: "B2",
      geolocation: [],
    },
  },
  "RIMP-0000-00000004": {
    productor: "Productor C",
    apiario: {
      nombre: "C1",
      geolocation: [],
    },
  },
};

/* Eventos de ingreso a planta. 2 lotes de alzas y 2 tambores */

const eventI1: ObjectEvent = {
  eventId: "eventI1",
  kind: "ObjectEvent",
  action: "ADD",
  eventTime: "10/12/2019 10:05:12",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  epcList: [
    "[L:191219208101 P:1 Vto:19/12/2021]", //Alza
  ],
  bizStep: "urn:epcglobal:cbv:bizstep:receiving",
  disposition: "urn:epcglobal:cbv:disp:active",
  bizTransactionList: ["RIMP-0000-00000001"],
};
const eventI2: ObjectEvent = {
  eventId: "eventI2",
  kind: "ObjectEvent",
  action: "ADD",
  eventTime: "11/12/2019 11:05:12",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  epcList: [
    "[L:191219208102 P:1 Vto:19/12/2021]", //Alza
  ],
  bizStep: "urn:epcglobal:cbv:bizstep:receiving",
  disposition: "urn:epcglobal:cbv:disp:active",
  bizTransactionList: ["RIMP-0000-00000002"],
};
const eventI3: ObjectEvent = {
  eventId: "eventI3",
  kind: "ObjectEvent",
  action: "ADD",
  eventTime: "12/12/2019 12:05:12",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  epcList: [
    "8838 L:191002000401 P:1 Vto:02/10/2021", //Tambor
  ],
  bizStep: "urn:epcglobal:cbv:bizstep:receiving",
  disposition: "urn:epcglobal:cbv:disp:active",
  bizTransactionList: ["RIMP-0000-00000003"],
};
const eventI4: ObjectEvent = {
  eventId: "eventI4",
  kind: "ObjectEvent",
  action: "ADD",
  eventTime: "13/12/2019 13:05:12",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  epcList: [
    "8839 L:191002000402 P:1 Vto:02/10/2021", //Tambor
  ],
  bizStep: "urn:epcglobal:cbv:bizstep:receiving",
  disposition: "urn:epcglobal:cbv:disp:active",
  bizTransactionList: ["RIMP-0000-00000004"],
};

/* Eventos de extraccion. Alzas de eventos I1 e I2*/

const eventE1: TransformationEvent = {
  eventId: "eventE1",
  kind: "TransformationEvent",
  eventTime: "14/12/2019 10:05:12",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  inputEPCList: [
    "[L:191219208101 P:1 Vto:19/12/2021]", //Alza
  ],
  outputEPCList: [
    "6789 [L:2068|P:20200319165609010|Vto:19/03/2022]",
    "6790 [L:2068|P:20200319165609010|Vto:19/03/2022]",
  ],
};

const eventE2: TransformationEvent = {
  eventId: "eventE2",
  kind: "TransformationEvent",
  eventTime: "14/12/2019 11:05:12",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  inputEPCList: [
    "[L:191219208102 P:1 Vto:19/12/2021]", //Alza
  ],
  outputEPCList: [
    "6791[L:2069|P:20200319165609011|Vto:19/03/2022]",
    "6792[L:2069|P:20200319165609011|Vto:19/03/2022]",
  ],
};

/* Homogeneizado Tambores E1 e I3*/
const eventH1: TransformationEvent = {
  eventId: "eventH1",
  kind: "TransformationEvent",
  eventTime: "20/12/2019 11:05:12",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  inputEPCList: [
    "8838 L:191002000401 P:1 Vto:02/10/2021", //Tambor
    "6789 [L:2068|P:20200319165609010|Vto:19/03/2022]", //Tambor
    "6790 [L:2068|P:20200319165609010|Vto:19/03/2022]", //Tambor
  ],
  outputEPCList: [
    "8838 P:20200804115529837 P:1 Vto:02/10/2021", //Tambor
    "6789 [L:2068|P:20200804115529837|Vto:19/03/2022]", //Tambor
    "6790 [L:2068|P:20200804115529837|Vto:19/03/2022]", //Tambor
  ],
};

const eventF1: TransformationEvent = {
  eventId: "eventF1",
  kind: "TransformationEvent",
  eventTime: new Date().toISOString(),
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  inputEPCList: [
    "8838 P:20200804115529837 P:1 Vto:02/10/2021", //Tambor
    "6789 [L:2068|P:20200804115529837|Vto:19/03/2022]", //Tambor
    "6790 [L:2068|P:20200804115529837|Vto:19/03/2022]", //Tambor
  ],
  outputEPCList: [
    "[L:2124|P:20200824123637337|Vto:24/08/2022]", //[384]  MO-EV450 Miel Organica Multiflora Wayra x 450g VIDRIO
    "[L:2124|P:20200824124003267|Vto:24/08/2022]", //[164] MO-EV250 Miel Organica Multifloral Wayra x 250 G. VIDRIO
    "[L:2124|P:20200824124242937|Vto:24/08/2022]", //[130]MO-UNIDADES-EV440 Miel Orgánica Multifloral Wayra
  ],
};

const events = [
  eventI1,
  eventI2,
  eventI3,
  eventI4,
  eventE1,
  eventE2,
  eventH1,
  eventF1,
];

export default events;
