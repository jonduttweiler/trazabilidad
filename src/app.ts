import express from "express";
import path from "path";
import { EPCISEvent, ObjectEvent, TransformationEvent } from "./types"
import { loadApiEndpoints } from "./controllers/api";


const event: ObjectEvent = {
  action: "OBSERVE",
  eventTime: new Date().toISOString(),
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
  eventId: "123",
  bizLocation: "Coopsol Deposito (GLN)",
  epcList: ["SGTIN1", "SGTIN2", "SGTIN3"]
}


/* Podemos relacionar el proceso de fraccionado con un solo evento */
/* Evento de trasnformacion tipo3 envasado/fraccionado */
const eventoLote2086 : TransformationEvent = {
  eventTime: "01/07/2020 14:00:00",
  recordTime: new Date().toISOString(),
  eventTimeZoneOffset: "-3:00",
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



console.log(event)

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;
