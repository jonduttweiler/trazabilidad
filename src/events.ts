import { EPCISEvent, ObjectEvent, TransformationEvent } from "./types"

/* Agregar un biz step  & bizLocation a cada evento */
const coopsolLocation = "urn:epc:id:gln:7795507000006";

//Mov AIR - ALTA POR INFORME RECEPCIÓN
const eventoLote191211104202 : ObjectEvent = {
  action: "ADD", /* Es un ingreso a planta de un tambor */
  eventTime: "11/12/2019 10:05:12",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  bizStep: "urn:epcglobal:cbv:bizstep:receiving",
  disposition: "urn:epcglobal:cbv:disp:active",
  bizLocation: coopsolLocation,
  epcList: [
    "[L:191211104202 P:1 Vto:11/12/2021]" /* Numero de envase 6576 */ /* Este tambor se usa en el lote 2101 -> Homogeneizado*/
  ],
  bizTransactionList: [
    "RIMP-0000-00000062"
  ],
  /* Podemos usar n mov como event id? */
}

//Mov AIR - ALTA POR INFORME RECEPCIÓN
/* Al momento de hacer un ingreso se deberian copiar los datos actuales del apiario (posicion + nro colmenas) hacer un snapshot */
/* Copiar algunos datos del rimp en el evento, como el productor y el apiario, de esta forma aseguramos que no se modifiquen */
const eventoLote191211104203 : ObjectEvent = {
  action: "ADD", /* Es un ingreso a planta de un tambor */
  eventTime: "11/12/2019 10:05:12",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  bizStep: "urn:epcglobal:cbv:bizstep:receiving",
  disposition: "urn:epcglobal:cbv:disp:active",
  bizLocation: coopsolLocation,
  epcList: [
    "[L:191211104203 P:1 Vto:11/12/2021]" /* Numero de envase 6577 */ /* Este tambor se usa en el lote 2101 -> Homogeneizado*/
  ],
  bizTransactionList: [
    "RIMP-0000-00000062"
  ] 
  //Depósito Ingreso Planta (Sector 1) Poner como destination donde quedo
  /* Podemos usar n mov como event id? */
}

/* Homogeneizado */
// ALIPROD - ALTA POR LIBERACIÓN DE PRODUCCIÓN
const eventoLote2101 : TransformationEvent = {
  eventTime: "12/08/2020 10:15:00",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  bizLocation: coopsolLocation,
  inputEPCList: [
    "[L:191211104202 P:1 Vto:11/12/2021]", /* [305] Tipo & identifcador Tipo: MO-T300... env 6576 + unidades*/
    "[L:191211104203 P:1 Vto:11/12/2021]" /* [309] Tipo & identifcador Tipo: MO-T300... env 6577 + unidades*/
  ],
  outputEPCList: [ 
    "[L:2101|P:20200812101434617|Vto:12/08/2022]", //[300] MOAT-T300 TAMBOR PARA MIEL ORGÁNICA MONOFLORAL DE ATAMISQUI - ENV:6576
    "[L:2101|P:20200812101434617|Vto:12/08/2022]" //[300] MOAT-T300 TAMBOR PARA MIEL ORGÁNICA MONOFLORAL DE ATAMISQUI - ENV:6577 
  ]
 
}

/* Podemos relacionar el proceso de fraccionado con un solo evento */
/* Evento de trasnformacion tipo3 envasado/fraccionado */
const eventoLote2086 : TransformationEvent = {
  eventTime: "01/07/2020 14:00:00",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  bizLocation: coopsolLocation,
  inputEPCList: [
    "[L:200414000415|P:1|Vto:14/04/2022]", /* Tipo & identifcador Tipo: MO-T300... env 7187 + unidades*/
    "[L:200414000417|P:1|Vto:14/04/2022]" /* Tipo & identifcador Tipo: MO-T300... env 7189 + unidades*/
  ],
  outputEPCList: [
    "[L:2086|P:20200701135955463|Vto:01/07/2022]", // [672] MO-UNIDADES-EV440 Miel Orgánica Multifloral Wayra,
    "[L:2086|P:20200701135955463|Vto:01/07/2022]" //  [303] MO-T300 TAMBOR DE MIEL ORGANICA MULTIFLORAL - ENV:7187 Se mandaron 303 kg al tambor?
  ]
}


const eventoLote2123 : TransformationEvent = {
  eventTime: new Date().toISOString(),
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  bizLocation: coopsolLocation,
  inputEPCList: [
   "[L:2101|P:20200812101434617|Vto:12/08/2022]", //MOAT-T300 TAMBOR PARA MIEL ORGÁNICA MONOFLORAL DE ATAMISQUI - ENV:6576
   "[L:2101|P:20200812101434617|Vto:12/08/2022]" //MOAT-T300 TAMBOR PARA MIEL ORGÁNICA MONOFLORAL DE ATAMISQUI - ENV:6577
  ],
  outputEPCList: [
    "[L:2123|P:20200812102834140|Vto:12/08/2022]", //[1363] MOAT-EV440 MIEL ORGANICA MONOFLORA DE ATAMISQUI WAYRA 440 g VIDRIO
  ]
}

const eventoLote2124 : TransformationEvent = {
  eventTime: "24/08/2020 11:38:26",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  bizLocation: coopsolLocation,
  inputEPCList: [
   "[L:2086|P:20200701135955463|Vto:01/07/2022]", //MO-T300 TAMBOR DE MIEL ORGANICA MULTIFLORAL - ENV:7187
  ],
  outputEPCList: [
    "[L:2124|P:20200824123637337|Vto:24/08/2022]", // [384] MO-EV450 Miel Organica Multiflora Wayra x 450g VIDRIO
    "[L:2124|P:20200824124003267|Vto:24/08/2022]", // [164] MO-EV250 Miel Organica Multifloral Wayra x 250 G. VIDRIO
    "[L:2124|P:20200824124137060|Vto:24/08/2022]", // [130] MO-UNIDADES-EV440 Miel Orgánica Multifloral Wayra
    "[L:2124|P:20200824124242937|Vto:24/08/2022]" // [32kg]MO-T300 TAMBOR DE MIEL ORGANICA MULTIFLORAL - ENV:MMO022 
  ]
}

export default {
  coopsolLocation,
  eventoLote191211104202,
  eventoLote191211104203,
  eventoLote2101,
  eventoLote2086,
  eventoLote2123,
  eventoLote2124
};
