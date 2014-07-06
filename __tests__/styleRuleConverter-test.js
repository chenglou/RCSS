jest
  .dontMock('../styleRuleConverter')
  .dontMock('../styleRuleValidator');

var styleRuleConverter;
var r;

describe('rulesToString', function() {
  beforeEach(function() {
    styleRuleConverter = require('../styleRuleConverter');
    r = styleRuleConverter.rulesToString.bind(null, 'a');
  });

  describe('on normal styles', function() {
    it('should construct many rules and concat them', function() {
      expect(r({display: 'none', height: '10px'}))
        .toBe('.a{display:none;height:10px;}');
    });

    it('should hyphenate', function() {
      expect(r({backgroundColor: 'blue'})).toBe('.a{background-color:blue;}');
    });

    it('should ignore unknown props', function() {
      var msg = '%s (transformed into %s) is not a valid CSS property name.';
      spyOn(console, 'warn');

      expect(r({foo: 'a', bar: 'b'})).toBe('');
      expect(console.warn.argsForCall.length).toBe(2);
      expect(console.warn.argsForCall[0][0]).toBe(msg);
      expect(console.warn.argsForCall[1][0]).toBe(msg);
    });

    it('should accept correct vendor prefixes', function() {
      expect(r({WebkitTransition: 'a', MozTransition: 'b'}))
        .toBe('.a{-webkit-transition:a;-moz-transition:b;}');
      expect(r({WebkitBla: 'a'})).toBe('');
      expect(r({MsTransition: 'a'})).toBe('.a{-ms-transition:a;}');
      // See note in styleRuleConverter#hyphenateProp
      expect(r({msTransition: 'a'})).toBe('.a{-ms-transition:a;}');
    });

    it('should quote content', function() {
      expect(r({content: 'bla'})).toBe('.a{content:"bla";}');
    });

    it('should not accept null values', function() {
      expect(r({border: null, width: '', height: false})).toBe('');
    });

    it('should escape values', function() {
      expect(r({border: '<>"\'&hello'}))
        .toBe('.a{border:&lt;&gt;&quot;&#39;&amp;hello;}');
      expect(r({content: '<>"\'&hello'}))
        .toBe('.a{content:"<>"\'&hello";}');
    });

    it('should not accept null values', function() {
      expect(r({border: null, width: '', height: false})).toBe('');
    });

    it('returns an empty string if everything was invalid', function() {
      expect(r({foo: 'bar', display: false})).toBe('');
    });
  });

  describe('on pseudo-selectors', function() {
    it('parses pseudo-selectors', function() {
      var style = {
        border: 'none',
        ':hover': {
          border: '1px solid black'
        }
      };
      expect(r(style)).toBe(
        '.a{border:none;}.a:hover{border:1px solid black;}'
      );
    });

    it('does not include an empty rule if no normal rule is specified',
      function() {
        expect(r({':before': {color: 'blue'}})).toBe('.a:before{color:blue;}');
      }
    );

    it('parses media-queries', function() {
      var style = {
        display: 'none',
        '@media (max-width: 500px)': {
          display: 'block'
        },
        '@media (min-width: 100px) and (max-width: 200px)': {
          color: 'blue'
        }
      };
      expect(r(style)).toBe(
        '.a{display:none;}@media (max-width: 500px){.a{display:block;}}' +
        '@media (min-width: 100px) and (max-width: 200px){.a{color:blue;}}'
      );
    });
  });

});
