'use strict';

/**
 * Dependencies
 */

const lint = require('../');

require('chai').should();


/**
 * Tests
 */

describe ('lint-require', function () {

  it ('report unused and missing deps', function () {
    let deps = lint(__dirname + '/fixtures/app/package.json');

    deps.missing.should.deep.equal(['express']);
    deps.unused.should.deep.equal(['request']);
  });

  it ('report all deps as missing if package.json "dependencies" is empty', function () {
    let deps = lint(__dirname + '/fixtures/app/package-no-deps.json');

    deps.missing.should.deep.equal(['koa', 'express']);
    deps.unused.length.should.equal(0);
  });

  it ('fail if package.json does not have "main" entry', function () {
    let isFailed = false;

    try {
      lint(__dirname + '/fixtures/app/package-no-main.json');
    } catch (err) {
      isFailed = true;
    }

    isFailed.should.equal(true);
  });

});
