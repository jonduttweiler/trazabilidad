type EventID = string;
type dateTimeStamp = string; /* Should be timestamp*/
type ErrorDeclaration = string;
type EPC = string; //Identificadores de clase/ de instancia?
type QuantityElement = string;
type BusinessStepID = string;
type DispositionID = string; /* The business condition of the objects, */
type ReadPointID = string; /*GLN */
type BusinessLocationID = string; /* GLN */
type BusinessTransaction = string;
type Source = string;
type Destination = string;
type ILMD = string;
type TransformationID = string;

export type EPCISEvent = {
  eventTime: dateTimeStamp
  recordTime?: dateTimeStamp
  eventTimeZoneOffset: string,
  eventId?: EventID,
  errorDeclaration?: ErrorDeclaration
}

export type ObjectEvent = EPCISEvent & {
  action: "ADD" | "OBSERVE" | "DELETE"
  epcList?: EPC[]
  quantityList?: QuantityElement[]
  readPoint?: ReadPointID
  bizLocation?: BusinessLocationID
  bizStep?: BusinessStepID
  disposition?: DispositionID
  bizTransactionList?: BusinessTransaction[]
  sourceList?: Source[]
  destinationList?: Destination[]
  ilmd?: ILMD
};
export type AggregationEvent = EPCISEvent & {
  action: "ADD" | "OBSERVE" | "DELETE"
  parentID: EPC
  childEPCs: EPC[]
  childQuantityList: QuantityElement[]
  readPoint?: ReadPointID
  bizLocation?: BusinessLocationID
  bizStep?: BusinessStepID
  disposition?: DispositionID
  bizTransactionList?: BusinessTransaction[]
  sourceList?: Source[]
  destinationList?: Destination[]

};
export type TransformationEvent = EPCISEvent & {
  inputEPCList?: EPC[]
  inputQuantityList?: QuantityElement[]
  outputEPCList?: EPC[]
  outputQuantityList?: QuantityElement[]
  transformationId?: TransformationID,
  readPoint?: ReadPointID
  bizLocation?: BusinessLocationID
  bizStep?: BusinessStepID
  disposition?: DispositionID
  bizTransactionList?: BusinessTransaction[]
  sourceList?: Source[]
  destinationList?: Destination[]
  ilmd?: ILMD
};
export type TransactionEvent = EPCISEvent & {
  bizTransactionList: BusinessTransaction[]
  action: "ADD" | "OBSERVE" | "DELETE"
  parentID?: EPC, //When the parent identifieris an EPC, this field SHALL contain the “pure identity” URI 
  epcList?: EPC[]
  quantityList?: QuantityElement[]
  readPoint?: ReadPointID
  bizLocation?: BusinessLocationID
  bizStep?: BusinessStepID
  disposition?: DispositionID
  sourceList?: Source[]
  destinationList?: Destination[]
};