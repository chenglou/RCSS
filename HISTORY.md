Legend:
  - [I]: improvement
  - [F]: fix

## 0.1.1 (July 30th 2014)
- [I] Global registry so that (theoretically) multiple RCSSs can work well with `injectAll`.

## 0.1.0 (July 5th 2014)
- [I] `createClass` is now `registerClass`, to reflect the procedure better.
- [I] `merge` is now `cascade`. Same behavior, but renamed in case the functionality changes under the hood in the future.
- [I] `registerClass` no longer mutates the passed-in object. Rather, it creates a wrapper around it. See API for more detail.
- [I] Server-side rendering! See API.
- [I] Support for media-queries and pseudo-selectors.
- [F] Minor bugs.

## 0.0.0 (November 13th 2013)
- Initial public release.
