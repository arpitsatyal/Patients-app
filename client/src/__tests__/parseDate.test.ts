import { parseDate } from "../utils/parseDate";

const expectedDate = "2022-08-24";

describe("parse date to correct format", () => {
  it("returns date in string", () => {
    expect(parseDate(new Date())).toBe(expectedDate);
  });
});
