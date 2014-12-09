function isString(string){
    return typeof string == 'string' || string instanceof String;
}

function isNumber(number){
    return !isNaN(number);
}

function isValidProp(prop) {
  return value !== '' && isString(prop);
}

function isValidValue(value) {
  return value !== '' && (isNumber(value) || isString(value));
}

module.exports = {
  isValidProp: isValidProp,
  isValidValue: isValidValue
};
