jest.dontMock('../styleRuleValidator');

var styleRuleValidator = require('../styleRuleValidator');

describe('styleRuleValidator', function() {
  it('should check whether a style value is valid', function() {
    expect(styleRuleValidator.isValidValue(undefined)).toBe(false);
    expect(styleRuleValidator.isValidValue(true)).toBe(false);
    expect(styleRuleValidator.isValidValue('')).toBe(false);
    expect(styleRuleValidator.isValidValue('true')).toBe(true);
    expect(styleRuleValidator.isValidValue(10)).toBe(true);
    expect(styleRuleValidator.isValidValue('10px')).toBe(true);
  });

  it('should check whether a style prop is valid', function() {
    expect(styleRuleValidator.isValidProp('background-color')).toBe(true);
    expect(styleRuleValidator.isValidProp('backgroundColor')).toBe(false);

    expect(styleRuleValidator.isValidProp('-webkit-bla')).toBe(false);
    expect(styleRuleValidator.isValidProp('-moz-transition')).toBe(true);
  });
});
