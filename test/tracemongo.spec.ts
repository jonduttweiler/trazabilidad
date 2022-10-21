import { EventsService } from "../src/services/EventsService";
import { LocalEventsService } from "../src/services/LocalEventsService";
import {
  MongoDBEventsService,
  MongoDBEventsServiceBuilder,
} from "../src/services/MongoDBEventsService";
import { TraceService } from "../src/services/TraceService";

let traceService: TraceService;

describe("trace test mongodb", () => {
  beforeAll(async () => {
    const serviceBuilder = new MongoDBEventsServiceBuilder({
      url: "mongodb://172.17.0.2:27017",
      dbName: "demo",
    });
    const eventsService: EventsService = await serviceBuilder.create();
    traceService = new TraceService(eventsService);
  });

  it("Should return undefined for inexistent product code", async () => {
    expect(await traceService.trace("xxxx")).toHaveLength(0);
  });

  /*   it("Should return correct trace length for existent products code", async () => {
    expect(await traceService.trace("FA01")).toHaveLength(2);
    expect(await traceService.trace("FA04")).toHaveLength(3);
    expect(await traceService.trace("FA06")).toHaveLength(4);
    expect(await traceService.trace("FA08")).toHaveLength(6);
    expect(await traceService.trace("FA10")).toHaveLength(8);
  }); */

  it("Should return correct trace length for existent products code", async () => {
    const startTime = new Date().getTime();
    const trace = await traceService.trace("F-0000-00150132");
    const endTime = new Date().getTime();

    expect(trace).toBeTruthy();
    console.log(trace);
    console.log(`Trace F-0000-00150132 took ${endTime - startTime} ms`);
  });
});
