jest
  .dontMock('../')
  .dontMock('../styleRuleConverter')
  .dontMock('../styleRuleValidator');

var RCSS = require('../');

describe('RCSS', function() {
  describe('merge', function() {
    it('should merge objects by overriding the left one', function() {
      var a = {a: 5};
      var b = {a: 6, b: 7};

      expect(RCSS.merge(a, b)).toEqual({a: 6, b: 7});
    });

    it('should not mutate anything', function() {
      var a = {a: 5};
      var b = {a: 6, b: 7};
      var c = RCSS.merge(a, b);

      expect(a).toEqual({a: 5});
      RCSS.merge(a, {bla: 8});
      expect(c).toEqual({a: 6, b: 7});
    });
  });

  describe('createClass', function() {
    // TODO: this.
  });
})
