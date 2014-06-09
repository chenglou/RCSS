jest.dontMock('../styleRuleConverter');

var styleRuleConverter = require('../styleRuleConverter');

describe('styleRuleConverter', function() {
  it('should escape the style values correctly', function() {
    expect(styleRuleConverter.escapeValue('<>"\'&hello')).toBe(
      '&lt;&gt;&quot;&#39;&amp;hello'
    );
  });

  it('should hyphenate camelCases correctly', function() {
    expect(styleRuleConverter.hyphenateProp('HelloWorld')).toBe('-hello-world');
    expect(styleRuleConverter.hyphenateProp('hello-Ha')).toBe('hello--ha');
  });
});
