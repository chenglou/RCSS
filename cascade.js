var DeepMerge = require('deep-merge/multiple');
var merge = DeepMerge(mergeStrategy);

// currently `cascade` does a simple merge. In the future, we might have smarter
// logic here for perf reasons.
function cascade() {
  return merge([].slice.call(arguments));
}

module.exports = cascade;

function mergeStrategy(a, b) {
    return b;
}
