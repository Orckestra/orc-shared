// this is temporar fix which is applied because after last changes in dep packages
// callBound.js in call-bind packages (which is dependancy of object.assign which is dep of enzyme)
// does not resolves  require('./') relatively itself
// and refers to this index.js file
// this behavior most likely comes from jest resolved
// also maybe it will be fixed in future as part of enzyme
module.exports = require("call-bind");

/* istanbul ignore next */
//throw new Error("Import files directly from this package's subdirectories");
