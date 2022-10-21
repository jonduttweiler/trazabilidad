interface IndexesObject {
  [key: string]: number;
}

const id_curr: IndexesObject = {};

function generateId(prefix: string) {
  const currentIndex: number = id_curr[prefix as keyof typeof id_curr] || 1;
  if (currentIndex === 1) {
    id_curr[prefix as keyof typeof id_curr] = 1;
  }

  const id = `${prefix || ""}-0000-${currentIndex.toString().padStart(8, "0")}`;
  id_curr[prefix as keyof typeof id_curr]++;
  return id;
}

export async function generateEvents(
  amount = 1000000,
  callback: (arg0: object) => Promise<any>
) {
  for (let i = 0; i < amount; ) {
    const it_events = []; //eventes generated in this interaction

    //Generate a start date and place events to relative this
    //Para los ingresos hay que generar un rimp, c/datos del prod y del apiario

    const tamboresExtraccionIds = [];
    let ingresoAlzaFlag = false;
    //No todos los lotes arrancan con un ingreso de alza

    if (Math.random() > 0.5) {
      //Generar entre una 1 y 3 !alzas - eventos de ingresos de alza
      const ingresoAlzasAmount = Math.ceil(Math.random() * 3);
      for (let j = 0; j < ingresoAlzasAmount; j++) {
        const alzasIds = Array.apply(
          null,
          Array(Math.ceil(Math.random() * 4))
        ).map((x, i) => {
          return generateId("A");
        });

        const e0 = ingresoAlza(
          generateId(`IA`),
          alzasIds,
          "11/12/2019 11:05:12",
          [generateId("RIMP")]
        );
        it_events.push(e0);

        //generar entre 1 y tres tambores como resultado de extraccion
        const tamboresExtraccionAmount = Math.ceil(Math.random() * 3);
        for (let j = 0; j < tamboresExtraccionAmount; j++) {
          tamboresExtraccionIds.push(generateId("T"));
        }

        const e01 = extraccion(
          generateId(`EA`),
          alzasIds,
          tamboresExtraccionIds,
          "11/12/2019 18:07:12"
        );
        it_events.push(e01);
      }

      ingresoAlzaFlag = true;
    }

    const tamboresIngresoIds = [];

    if (!ingresoAlzaFlag || (ingresoAlzaFlag && Math.random() > 0.5)) {
      //Tampoco todos van a tener un ingreso de tambor
      const eventosIngresoTamboresAmount = Math.ceil(Math.random() * 5); //Ingresar tambores por distintos eventos (hasta 5)
      /* Cada evnto que tenga entre 1 y 3 tambores distintos */

      for (let j = 0; j < eventosIngresoTamboresAmount; j++) {
        //Ids de este evento en particular
        const tamboresId = Array.apply(
          null,
          Array(Math.ceil(Math.random() * 3))
        ).map((x, i) => {
          return generateId("T");
        });
        const e1 = ingresoTambor(
          generateId("IT"),
          tamboresId,
          "10/12/2020 12:05:12",
          [generateId("RIMP")]
        );
        tamboresIngresoIds.push(...tamboresId);
        it_events.push(e1);
      }
    }

    //Al homogeneizado hacemos que entren los tambores que salen de extraccion y los que ingersan directamente
    const input = tamboresExtraccionIds.concat(tamboresIngresoIds);
    const outputH = Array.apply(null, Array(input.length)).map((x, i) => {
      return generateId("T");
    });
    const e2 = homogeneizado(
      generateId("HO"),
      input,
      outputH,
      "15/12/2020 12:05:12"
    );
    it_events.push(e2);

    const outputF = Array.apply(null, Array(Math.ceil(Math.random() * 5))).map(
      (x, i) => {
        return generateId("F");
      }
    );
    const e3 = fraccionado(
      generateId(`FR`),
      outputH,
      outputF,
      "16/12/2019 13:05:12"
    );
    it_events.push(e3);
    i += it_events.length;

    for (const event of it_events) {
      await callback(event);
    }
  }
}
function ingresoAlza(
  eventId: string,
  epcList: string[],
  eventTime: string,
  bizTransactionList: string[]
) {
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
    bizTransactionList: bizTransactionList,
  };
}
function ingresoTambor(
  eventId: string,
  epcList: string[],
  eventTime: string,
  bizTransactionList: string[]
) {
  return {
    //Ingreso de tambor
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

function extraccion(
  eventId: string,
  inputEPCList: string[],
  outputEPCList: string[],
  eventTime: string,
  bizTransactionList?: string[]
) {
  return {
    //Extraccion
    eventId: eventId,
    kind: "TransformationEvent",
    eventTime: eventTime,
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: inputEPCList,
    outputEPCList: outputEPCList,
    bizTransactionList: bizTransactionList || [],
  };
}

function homogeneizado(
  eventId: string,
  inputEPCList: string[],
  outputEPCList: string[],
  eventTime: string,
  bizTransactionList?: string[]
) {
  return {
    //Homogeneizado
    eventId: eventId,
    kind: "TransformationEvent",
    eventTime: eventTime,
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: inputEPCList,
    outputEPCList: outputEPCList,
    bizTransactionList: bizTransactionList || [],
  };
}
function fraccionado(
  eventId: string,
  inputEPCList: string[],
  outputEPCList: string[],
  eventTime: string,
  bizTransactionList?: string[]
) {
  return {
    //Fraccionado
    eventId: eventId,
    kind: "TransformationEvent",
    eventTime: eventTime,
    recordTime: new Date().toISOString(),
    eventTimeZoneOffset: "-3:00",
    inputEPCList: inputEPCList,
    outputEPCList: outputEPCList,
    bizTransactionList: bizTransactionList || [],
  };
}
