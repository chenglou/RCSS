var merge = require('lodash.merge');

// currently `cascade` does a simple merge. In the future, we might have smarter
// logic here for perf reasons.
function cascade() {
  return merge.bind(null, {}).apply(null, arguments);
}

module.exports = cascade;
