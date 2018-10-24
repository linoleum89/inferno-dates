'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DayPickerNavigation;

var _inferno = require('inferno');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _airbnbPropTypesInferno = require('../airbnb-prop-types-inferno');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _arrowLeft = require('../svg/arrow-left');

var _arrowLeft2 = _interopRequireDefault(_arrowLeft);

var _arrowRight = require('../svg/arrow-right');

var _arrowRight2 = _interopRequireDefault(_arrowRight);

var _chevronUp = require('../svg/chevron-up');

var _chevronUp2 = _interopRequireDefault(_chevronUp);

var _chevronDown = require('../svg/chevron-down');

var _chevronDown2 = _interopRequireDefault(_chevronDown);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)({
  navPrev: _propTypes2.default.node,
  navNext: _propTypes2.default.node,
  orientation: _ScrollableOrientationShape2.default,

  onPrevMonthClick: _propTypes2.default.func,
  onNextMonthClick: _propTypes2.default.func,

  // internationalization
  phrases: _propTypes2.default.shape((0, _getPhrasePropTypes2.default)(_defaultPhrases.DayPickerNavigationPhrases))
});

var defaultProps = {
  navPrev: null,
  navNext: null,
  orientation: _constants.HORIZONTAL_ORIENTATION,

  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},


  // internationalization
  phrases: _defaultPhrases.DayPickerNavigationPhrases
};

function DayPickerNavigation(props) {
  var navPrev = props.navPrev,
      navNext = props.navNext,
      onPrevMonthClick = props.onPrevMonthClick,
      onNextMonthClick = props.onNextMonthClick,
      orientation = props.orientation,
      phrases = props.phrases;


  var isVertical = orientation !== _constants.HORIZONTAL_ORIENTATION;
  var isVerticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;

  var navPrevIcon = navPrev;
  var navNextIcon = navNext;
  var isDefaultNavPrev = false;
  var isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    navPrevIcon = isVertical ? (0, _inferno.createComponentVNode)(2, _chevronUp2.default) : (0, _inferno.createComponentVNode)(2, _arrowLeft2.default);
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = isVertical ? (0, _inferno.createComponentVNode)(2, _chevronDown2.default) : (0, _inferno.createComponentVNode)(2, _arrowRight2.default);
  }

  var navClassNames = (0, _classnames2.default)('DayPickerNavigation', {
    'DayPickerNavigation--horizontal': !isVertical,
    'DayPickerNavigation--vertical': isVertical,
    'DayPickerNavigation--vertical-scrollable': isVerticalScrollable
  });
  var prevClassNames = (0, _classnames2.default)('DayPickerNavigation__prev', {
    'DayPickerNavigation__prev--default': isDefaultNavPrev
  });
  var nextClassNames = (0, _classnames2.default)('DayPickerNavigation__next', {
    'DayPickerNavigation__next--default': isDefaultNavNext
  });

  return (0, _inferno.createVNode)(1, 'div', navClassNames, [!isVerticalScrollable && (0, _inferno.createVNode)(1, 'button', prevClassNames, navPrevIcon, 0, {
    'type': 'button',
    'aria-label': phrases.jumpToPrevMonth,
    'onClick': onPrevMonthClick,
    'onMouseUp': function onMouseUp(e) {
      e.currentTarget.blur();
    }
  }), (0, _inferno.createVNode)(1, 'button', nextClassNames, navNextIcon, 0, {
    'type': 'button',
    'aria-label': phrases.jumpToNextMonth,
    'onClick': onNextMonthClick,
    'onMouseUp': function onMouseUp(e) {
      e.currentTarget.blur();
    }
  })], 0);
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;