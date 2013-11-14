function isValidName(name) {
  // TODO: store all css props somewhere and check validity
  return true;
}

function isValidValue(value) {
  return value != null && typeof value !== 'boolean' && value !== '';
}

module.exports = {
  isValidName: isValidName,
  isValidValue: isValidValue
};
