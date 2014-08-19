jest
  .dontMock('../styleTagManager');

var styleTagManager;

describe('styleTagManager', function() {
  beforeEach(function() {
    styleTagManager = require('../styleTagManager');
  });

  it('should detect RCSS classes in style tag', function() {
    var className1 = 'cabcdef';
    var className2 = 'cghijkl';

    var styleTag = styleTagManager.getStyleTag();

    // Mock out a stylesheet
    var styleSheet = {
      ownerNode: styleTag,
      cssRules: [
        { selectorText: '.' + className1 },
        { selectorText: '.' + className2 + ':hover' }
      ]
    };
    document.styleSheets[0] = styleSheet;

    expect(styleTagManager.getClasses()).toEqual([className1, className2]);
  });
});
