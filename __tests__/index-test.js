jest
  .dontMock('../')
  .dontMock('../styleRuleConverter')
  .dontMock('../registerClass')
  .dontMock('../styleRuleValidator');

var RCSS;

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
      var className1 = RCSS.registerClass({display: 'none'}).className;
      var className2 = RCSS.registerClass({display: 'block'}).className;

      expect(RCSS.getStylesString()).toBe(
        '.' + className1 + '{display:none;}.' + className2 + '{display:block;}'
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
      var className = RCSS.registerClass({display: 'none'}).className;
      RCSS.injectAll();
      expect(document.querySelector('style').innerHTML).toBe(
        '.' + className + '{display:none;}'
      );
    });
  });
});
