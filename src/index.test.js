const expect = require("chai").expect;
import Pool from "./index";

describe("Pool", function () {
  it("should create Pool", function () {
    const pool = new Pool(
      () => {
        return { foo: "bar" };
      },
      (elem) => {
        elem.initialized = true;
      }
    );

    expect(pool.get().foo).to.equal("bar");
    expect(pool.get().initialized).to.be.undefined;
    expect(pool.get(true).initialized).to.be.true;

    pool.recycle({ foo: "baz" });
    expect(pool.get().foo).to.equal("baz");
  });
});
