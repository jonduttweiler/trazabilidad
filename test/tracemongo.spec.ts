import { TraceService } from "../src/services/TraceService";
import { LocalEventsService } from "../src/services/LocalEventsService";
import { MongoDBEventsService } from "../src/services/MongoDBEventsService";


const eventsService = new MongoDBEventsService({ 
  url: "mongodb://172.17.0.2:27017",
  dbName: "demo"
});
const traceService = new TraceService(eventsService);

/* eventsService.on("connected", async () => {
  console.log('searching...');
  const result = await eventsService.ouputFrom("FA01");
  console.log(result)
})

 */
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
