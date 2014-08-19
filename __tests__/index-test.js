jest
  .dontMock('../')
  .dontMock('../styleTagManager')
  .dontMock('../styleRuleConverter')
  .dontMock('../registerClass')
  .dontMock('../styleRuleValidator');

var RCSS;

function clearRCSS() {
  // Clear the DOM.
  [].slice.apply(document.querySelectorAll('style')).forEach(function(tag) {
    tag.parentNode.removeChild(tag);
  });

  // Clear the registry.
  var global = Function("return this")();
  global.__RCSS_0_registry = {};
  global.__RCSS_0_document_registry = {};
}

describe('RCSS', function() {
  beforeEach(function() {
    RCSS = require('../');
  });

  describe('getStyleString', function() {
    it('returns the string of style markup', function() {
      var className = RCSS.registerClass({display: 'none'}).className;

      expect(RCSS.getStyleString(className)).toBe(
        '.' + className + '{display:none;}'
      );
    });
  });

  describe('getStylesString', function() {
    it('returns the string of style markup', function() {
      var className1 = RCSS.registerClass({display: 'none'}).className;
      var className2 = RCSS.registerClass({display: 'block'}).className;

      expect(RCSS.getStylesString()).toBe(
        '.' + className1 + '{display:none;}.' + className2 + '{display:block;}'
      );
    });
  });

  describe('injectAll', function() {
    afterEach(clearRCSS);

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

    it('should inject each class exactly once', function() {
      var className = RCSS.registerClass({display: 'none'}).className;
      RCSS.injectAll();
      RCSS.injectAll();
      expect(document.querySelector('style').innerHTML).toBe(
        '.' + className + '{display:none;}'
      );
    });
  });

  describe('injectStyle', function() {
    afterEach(clearRCSS);

    it('should only inject a single style', function() {
      var className = RCSS.registerClass({display: 'none'}).className;
      RCSS.registerClass({display: 'block'});
      RCSS.injectStyle(className);
      expect(document.querySelector('style').innerHTML).toBe(
        '.' + className + '{display:none;}'
      );
    });
  });
});
