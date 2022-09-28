import { TraceService } from "../src/services/TraceService";
import { LocalEventsService } from "../src/services/LocalEventsService";
import { events } from "../src/data/test";

const eventsService = new LocalEventsService(events);
const traceService = new TraceService(eventsService);


describe("trace test", () => {
  
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
