jest
  .dontMock('../cascade');

var cascade;

describe('cascade', function() {
  beforeEach(function() {
    cascade = require('../cascade');
  });

  it('should merge objects by overriding the left one', function() {
    var a = {a: 5};
    var b = {a: 6, b: 7};

    expect(cascade(a, b)).toEqual({a: 6, b: 7});
  });

  it('should deeply merge', function() {
    // In our case, we only need to deeply merge objects.
    var a = {a: {c: 5, d: 6}};
    var b = {a: {c: 7, e: 8}, b: 9};

    expect(cascade(a, b)).toEqual({a: {c: 7, d: 6, e: 8}, b: 9});
  });

  it('should not mutate anything', function() {
    var a = {a: 5};
    var b = {a: 6, b: 7};
    var c = cascade(a, b);

    expect(a).toEqual({a: 5});
    cascade(a, {bla: 8});
    expect(c).toEqual({a: 6, b: 7});
  });
});
