interface IObjectKeys {
    [key: string]: Object;
  }

const rimps : IObjectKeys = { //REMITO INGRESO PLANTA MATERIA PRIMA 
    "RIMP-0000-00000062": { 
        /* Datos productor + datos apiario */
        productor: {
            razon_social: "Villa victor Edilberto",
            cuit: "20-18495202-6",

        },
        apiario: {
            nombre: "CM 7 | CAMPO AMOR (4230) - SE",
            geo: [-28.63491,-64.40391],
            colmenas: 35
        }
    }
}


class TransactionService {
    searchRimp(id: string) : (Object | undefined) {
        return rimps[id];
    }

}



export default TransactionService;