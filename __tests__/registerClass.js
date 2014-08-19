jest
  .dontMock('../registerClass');

var classNamePattern = /c\w+/;

var registerClass;

describe('registerClass', function() {
  beforeEach(function() {
    registerClass = require('../registerClass');
  });

  it('should turn an object into a css class descriptor', function() {
    var obj = {
      display: 'inline',
      padding: '6px 12px',
      marginBottom: '0',
      fontSize: '14px'
    };
    var obj2 = registerClass(obj);
    expect(obj2.style).toBe(obj);
    expect(obj2.className).toMatch(classNamePattern);
  });

  it('should generate the same class for indentical styles', function() {
    var className1 = registerClass({display: 'none'}).className;
    var className2 = registerClass({display: 'none'}).className;
    expect(className1).toBe(className2);
  });
});
