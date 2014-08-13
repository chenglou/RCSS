var createMarkupForStyles = require("./node_modules/react/lib/CSSPropertyOperations").createMarkupForStyles;

function createMarkup(prop, value) {
    var styleObj = {};
    styleObj[prop] = value;
    return createMarkupForStyles(styleObj);
}

module.exports = {
    createMarkup: createMarkup
};
