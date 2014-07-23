jest
  .dontMock('../')
  .dontMock('../styleRuleConverter')
  .dontMock('../styleRuleValidator');

var RCSS;
var classNamePattern = /c0-\w+/;
var classNameSuffixPattern = /.+-(.+$)/;

describe('RCSS', function() {
  beforeEach(function() {
    RCSS = require('../');
  });

  describe('registerClass', function() {
    it('should turn an object into a css class descriptor', function() {
      var obj = {
        display: 'inline',
        padding: '6px 12px',
        marginBottom: '0',
        fontSize: '14px'
      };
      var obj2 = RCSS.registerClass(obj);
      expect(obj2.style).toBe(obj);
      expect(obj2.className).toMatch(classNamePattern);
    });

    it('should generate the same random class suffix every time', function() {
      var className1 = RCSS.registerClass({display: 'none'}).className;
      var className2 = RCSS.registerClass({display: 'block'}).className;
      expect(className1.match(classNameSuffixPattern)[1])
        .toBe(className2.match(classNameSuffixPattern)[1]);
    });
  });

  describe('getStylesString', function() {
    it('has the side-effect of clearing the registered classes', function() {
      expect(RCSS.getStylesString()).toBe('');
      RCSS.registerClass({display: 'none'});
      RCSS.registerClass({display: 'block'});
      expect(RCSS.getStylesString()).not.toBe('');
      expect(RCSS.getStylesString()).toBe('');
    });

    it('returns the string of style markup', function() {
      var className = RCSS.registerClass({display: 'none'}).className;
      RCSS.registerClass({display: 'block'});

      var suffix = className.match(classNameSuffixPattern)[1];
      expect(RCSS.getStylesString()).toBe(
        '.c0-' + suffix + '{display:none;}.c1-' + suffix + '{display:block;}'
      );
    });
  });

  describe('injectAll', function() {
    afterEach(function() {
      // Clear the DOM.
      [].slice.apply(document.querySelectorAll('style')).forEach(function(tag) {
        tag.parentNode.removeChild(tag);
      });
    });

    it('should not inject the style tag unless called', function() {
      expect(document.querySelectorAll('style').length).toBe(0);
      RCSS.injectAll();
      expect(document.querySelectorAll('style').length).toBe(1);
    });

    it('should inject the markup', function() {
      var suffix = RCSS.registerClass({display: 'none'}).className
        .match(classNameSuffixPattern)[1];
      RCSS.injectAll();
      expect(document.querySelector('style').innerHTML).toBe(
        '.c0-' + suffix + '{display:none;}'
      );
    });
  });
});
