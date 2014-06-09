jest
  .dontMock('../')
  .dontMock('../styleRuleConverter')
  .dontMock('../styleRuleValidator');

var RCSS = require('../');

describe('RCSS', function() {
  it('should have injected an empty style tag into the head', function() {
    expect(document.querySelectorAll('style').length).toBe(1);
    expect(document.querySelector('style').innerHTML).toBe('');
  });

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
    var obj = {
      display: 'inline',
      padding: '6px 12px',
      marginBottom: '0',
      fontSize: '14px'
    };

    it('should turn an object into a css class descriptor', function() {
      expect(RCSS.createClass(obj)).toEqual({
        className: 'c0',
        display: 'inline',
        fontSize: '14px',
        marginBottom: '0',
        padding: '6px 12px'
      });
      // expect(document.querySelector('style').innerHTML).toBe(
      //   '.c0{display:inline;padding:6px 12px;margin-bottom:0;font-size:14px;}'
      // );
    });

    xit('should turn an object into a css class descriptor', function() {
      // expect(RCSS.createClass(obj));
      // expect(document.querySelector('style').innerHTML).toBe(
      //   '.c0{display:inline;padding:6px 12px;margin-bottom:0;font-size:14px;}'
      // );
    });
  });
})
