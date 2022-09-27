import { trace } from "../src/trace";

describe("trace test", () => {
  it("Should return undefined for inexistent product code", () => {
    expect(trace("xxxx")).toHaveLength(0);
  });

  it("Should return undefined for inexistent product code", () => {
    expect(trace("FA10")).toHaveLength(8);
  });
});
 