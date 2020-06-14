const { expect } = require("chai");
const { Stock } = require("../server/db");
const data = require("./data.json");

describe("Stock Portfolio TDD", () => {
  describe("Models", () => {
    describe("Stock", () => {
      describe("filterIexData", () => {
        const symbol = "AMZN";

        it("returns an array of filtered stock", async () => {
          const actual = await Stock.filterIexData(data, symbol);
          expect(Array.isArray(actual)).to.equal(true);
        });
      });
    });
  });
});
