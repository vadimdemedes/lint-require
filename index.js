'use strict';

/**
 * Dependencies
 */

const dirname = require('path').dirname;
const scan = require('scan-dependencies');
const diff = require('lodash.difference');
const join = require('path').join;


/**
 * Expose lint-require
 */

module.exports = lint;


/**
 * Search for require() calls and report back
 */

function lint (pkgPath) {
  let pkg = require(pkgPath);

  if (!pkg.main) {
    let err = new Error('No "main" entry in package.json.');
    throw err;
  }

  // build a path for entrypoint
  let basePath = dirname(pkgPath);
  let mainFile = join(basePath, pkg.main);
  
  let pkgDeps = Object.keys(pkg.dependencies || {});

  // scan for dependencies
  // starting from entrypoint
  let deps = scan(mainFile);

  let missingDeps = [];
  let usedDeps = [];

  deps.forEach(function (module) {
    let isMissing = pkgDeps.indexOf(module) === -1;
    let isUsing = !isMissing;

    if (isMissing) {
      missingDeps.push(module);
    }

    if (isUsing) {
      usedDeps.push(module);
    }
  });

  // unused deps is a difference between
  // package deps and found deps
  let unusedDeps = diff(pkgDeps, usedDeps);

  return {
    missing: missingDeps,
    unused: unusedDeps
  };
}
