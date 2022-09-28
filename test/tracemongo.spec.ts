import { TraceService } from "../src/services/TraceService";
import { LocalEventsService } from "../src/services/LocalEventsService";
import { MongoDBEventsServiceBuilder, MongoDBEventsService } from "../src/services/MongoDBEventsService";
import { EventsService } from "../src/services/EventsService";


let traceService: TraceService;

describe("trace test mongodb", () => {
  beforeAll(async () => {
    console.log("Can i use here a promise?");
    const serviceBuilder = new MongoDBEventsServiceBuilder({
      url: "mongodb://172.17.0.2:27017",
      dbName: "demo"
    });
    const eventsService: EventsService = await serviceBuilder.create()
    traceService = new TraceService(eventsService);

    console.log("traceService initialized")

  })

  it("Should return undefined for inexistent product code", () => {
    expect(traceService.trace("xxxx")).toHaveLength(0);
  });

  it("Should return correct trace length for existent products code", () => {
    expect(traceService.trace("FA01")).toHaveLength(2);
    expect(traceService.trace("FA04")).toHaveLength(3);
    expect(traceService.trace("FA06")).toHaveLength(4);
    expect(traceService.trace("FA08")).toHaveLength(6);
    expect(traceService.trace("FA10")).toHaveLength(8);
  });
});
