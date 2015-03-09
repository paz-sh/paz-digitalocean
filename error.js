module.exports = function(err) {
  console.error((err.backtrace || err.message || err).red);
}