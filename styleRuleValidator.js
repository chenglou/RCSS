function isValidValue(value) {
  return value !== '' && (typeof value === 'number' || typeof value === 'string');
}

module.exports = {
  isValidValue: isValidValue
};
