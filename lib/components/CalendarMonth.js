'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inferno = require('inferno');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _momentProptypesInferno = require('../moment-proptypes-inferno');

var _momentProptypesInferno2 = _interopRequireDefault(_momentProptypesInferno);

var _airbnbPropTypesInferno = require('../airbnb-prop-types-inferno');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _CalendarDay = require('./CalendarDay');

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

var _getCalendarMonthWeeks = require('../utils/getCalendarMonthWeeks');

var _getCalendarMonthWeeks2 = _interopRequireDefault(_getCalendarMonthWeeks);

var _isSameDay = require('../utils/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-array-index-key: 0 */

var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)({
  month: _momentProptypesInferno2.default.momentObj,
  isVisible: _propTypes2.default.bool,
  enableOutsideDays: _propTypes2.default.bool,
  modifiers: _propTypes2.default.object,
  orientation: _ScrollableOrientationShape2.default,
  daySize: _propTypes2.default.number,
  onDayClick: _propTypes2.default.func,
  onDayMouseEnter: _propTypes2.default.func,
  onDayMouseLeave: _propTypes2.default.func,
  renderDay: _propTypes2.default.func,

  focusedDate: _momentProptypesInferno2.default.momentObj, // indicates focusable day
  isFocused: _propTypes2.default.bool, // indicates whether or not to move focus to focusable day

  // i18n
  monthFormat: _propTypes2.default.string,
  phrases: _propTypes2.default.shape((0, _getPhrasePropTypes2.default)(_defaultPhrases.CalendarDayPhrases))
});

var defaultProps = {
  month: (0, _moment2.default)(),
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: _constants.HORIZONTAL_ORIENTATION,
  daySize: _constants.DAY_SIZE,
  onDayClick: function onDayClick() {},
  onDayMouseEnter: function onDayMouseEnter() {},
  onDayMouseLeave: function onDayMouseLeave() {},

  renderDay: null,

  focusedDate: null,
  isFocused: false,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: _defaultPhrases.CalendarDayPhrases
};

var CalendarMonth = function (_Component) {
  _inherits(CalendarMonth, _Component);

  function CalendarMonth(props) {
    _classCallCheck(this, CalendarMonth);

    var _this = _possibleConstructorReturn(this, (CalendarMonth.__proto__ || Object.getPrototypeOf(CalendarMonth)).call(this, props));

    _this.state = {
      weeks: (0, _getCalendarMonthWeeks2.default)(props.month, props.enableOutsideDays)
    };
    return _this;
  }

  _createClass(CalendarMonth, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var month = nextProps.month,
          enableOutsideDays = nextProps.enableOutsideDays;

      if (!month.isSame(this.props.month)) {
        this.setState({
          weeks: (0, _getCalendarMonthWeeks2.default)(month, enableOutsideDays)
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          month = _props.month,
          monthFormat = _props.monthFormat,
          orientation = _props.orientation,
          isVisible = _props.isVisible,
          modifiers = _props.modifiers,
          onDayClick = _props.onDayClick,
          onDayMouseEnter = _props.onDayMouseEnter,
          onDayMouseLeave = _props.onDayMouseLeave,
          renderDay = _props.renderDay,
          daySize = _props.daySize,
          focusedDate = _props.focusedDate,
          isFocused = _props.isFocused,
          phrases = _props.phrases;
      var weeks = this.state.weeks;

      var monthTitle = month.format(monthFormat);

      var calendarMonthClasses = (0, _classnames2.default)('CalendarMonth', {
        'CalendarMonth--horizontal': orientation === _constants.HORIZONTAL_ORIENTATION,
        'CalendarMonth--vertical': orientation === _constants.VERTICAL_ORIENTATION,
        'CalendarMonth--vertical-scrollable': orientation === _constants.VERTICAL_SCROLLABLE
      });

      return (0, _inferno.createVNode)(1, 'div', calendarMonthClasses, (0, _inferno.createVNode)(1, 'table', null, [(0, _inferno.createVNode)(1, 'caption', 'CalendarMonth__caption js-CalendarMonth__caption', (0, _inferno.createVNode)(1, 'strong', null, monthTitle, 0), 2), (0, _inferno.createVNode)(1, 'tbody', 'js-CalendarMonth__grid', weeks.map(function (week, i) {
        return (0, _inferno.createVNode)(1, 'tr', null, week.map(function (day, dayOfWeek) {
          return (0, _inferno.createComponentVNode)(2, _CalendarDay2.default, {
            'day': day,
            'daySize': daySize,
            'isOutsideDay': !day || day.month() !== month.month(),
            'tabIndex': isVisible && (0, _isSameDay2.default)(day, focusedDate) ? 0 : -1,
            'isFocused': isFocused,
            'modifiers': modifiers,
            'onDayMouseEnter': onDayMouseEnter,
            'onDayMouseLeave': onDayMouseLeave,
            'onDayClick': onDayClick,
            'renderDay': renderDay,
            'phrases': phrases
          }, dayOfWeek);
        }), 0, null, i);
      }), 0)], 4), 2, {
        'data-visible': isVisible
      });
    }
  }]);

  return CalendarMonth;
}(_inferno.Component);

exports.default = CalendarMonth;


CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;