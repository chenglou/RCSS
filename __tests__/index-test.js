jest
  .dontMock('../')
  .dontMock('../styleRuleConverter')
  .dontMock('../registerClass')
  .dontMock('../styleRuleValidator');

var RCSS;
var classNameSuffixPattern = /.+-(.+$)/;

describe('RCSS', function() {
  beforeEach(function() {
    RCSS = require('../');
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
