import { describe, expect, it } from "vitest";
import { numberWord } from "./format";

describe("numberWord", () => {
  it("spells out 0 to 10", () => {
    expect(numberWord(0)).toBe("zero");
    expect(numberWord(3)).toBe("three");
    expect(numberWord(10)).toBe("ten");
  });

  it("keeps larger, negative and fractional numbers as digits", () => {
    expect(numberWord(11)).toBe("11");
    expect(numberWord(-1)).toBe("-1");
    expect(numberWord(2.5)).toBe("2.5");
  });
});
