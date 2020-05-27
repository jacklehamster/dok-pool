const expect = require('chai').expect;
const { Pool } = require('./index.js');

describe('Pool', function() {
  it('should create Pool', function() {
  	const pool = new Pool(() => {
  		return { foo: "bar" };
  	}, elem => {
  		elem.initialized = true;
  	});

    expect(pool.get().foo).to.equal("bar");
    expect(pool.get().initialized).to.be.undefined;
    expect(pool.get(true).initialized).to.be.true;
  });
});
