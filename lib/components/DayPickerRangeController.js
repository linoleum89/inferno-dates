'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inferno = require('inferno');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _momentProptypesInferno = require('../moment-proptypes-inferno');

var _momentProptypesInferno2 = _interopRequireDefault(_momentProptypesInferno);

var _airbnbPropTypesInferno = require('../airbnb-prop-types-inferno');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _isTouchDevice = require('../utils/isTouchDevice');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

var _isInclusivelyAfterDay = require('../utils/isInclusivelyAfterDay');

var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

var _isNextDay = require('../utils/isNextDay');

var _isNextDay2 = _interopRequireDefault(_isNextDay);

var _isSameDay = require('../utils/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _FocusedInputShape = require('../shapes/FocusedInputShape');

var _FocusedInputShape2 = _interopRequireDefault(_FocusedInputShape);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _constants = require('../../constants');

var _DayPicker = require('./DayPicker');

var _DayPicker2 = _interopRequireDefault(_DayPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)({
  startDate: _momentProptypesInferno2.default.momentObj,
  endDate: _momentProptypesInferno2.default.momentObj,
  onDatesChange: _propTypes2.default.func,

  focusedInput: _FocusedInputShape2.default,
  onFocusChange: _propTypes2.default.func,
  onClose: _propTypes2.default.func,

  keepOpenOnDateSelect: _propTypes2.default.bool,
  minimumNights: _propTypes2.default.number,
  isOutsideRange: _propTypes2.default.func,
  isDayBlocked: _propTypes2.default.func,
  isDayHighlighted: _propTypes2.default.func,

  // DayPicker props
  enableOutsideDays: _propTypes2.default.bool,
  numberOfMonths: _propTypes2.default.number,
  orientation: _ScrollableOrientationShape2.default,
  withPortal: _propTypes2.default.bool,
  initialVisibleMonth: _propTypes2.default.func,
  daySize: _propTypes2.default.number,

  navPrev: _propTypes2.default.node,
  navNext: _propTypes2.default.node,

  onPrevMonthClick: _propTypes2.default.func,
  onNextMonthClick: _propTypes2.default.func,
  onOutsideClick: _propTypes2.default.func,
  renderDay: _propTypes2.default.func,
  renderCalendarInfo: _propTypes2.default.func,

  // accessibility
  onBlur: _propTypes2.default.func,
  isFocused: _propTypes2.default.bool,
  showKeyboardShortcuts: _propTypes2.default.bool,

  // i18n
  monthFormat: _propTypes2.default.string,
  phrases: _propTypes2.default.shape((0, _getPhrasePropTypes2.default)(_defaultPhrases.DayPickerPhrases))
});

var defaultProps = {
  startDate: undefined, // TODO: use null
  endDate: undefined, // TODO: use null
  onDatesChange: function onDatesChange() {},


  focusedInput: null,
  onFocusChange: function onFocusChange() {},
  onClose: function onClose() {},


  keepOpenOnDateSelect: false,
  minimumNights: 1,
  isOutsideRange: function isOutsideRange() {},
  isDayBlocked: function isDayBlocked() {},
  isDayHighlighted: function isDayHighlighted() {},


  // DayPicker props
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  withPortal: false,

  initialVisibleMonth: _DayPicker.defaultProps.initialVisibleMonth,
  daySize: _constants.DAY_SIZE,

  navPrev: null,
  navNext: null,

  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onOutsideClick: function onOutsideClick() {},


  renderDay: null,
  renderCalendarInfo: null,

  // accessibility
  onBlur: function onBlur() {},

  isFocused: false,
  showKeyboardShortcuts: false,

  // i18n
  monthFormat: 'MMMM YYYY',
  phrases: _defaultPhrases.DayPickerPhrases
};

var DayPickerRangeController = function (_Component) {
  _inherits(DayPickerRangeController, _Component);

  function DayPickerRangeController(props) {
    _classCallCheck(this, DayPickerRangeController);

    var _this = _possibleConstructorReturn(this, (DayPickerRangeController.__proto__ || Object.getPrototypeOf(DayPickerRangeController)).call(this, props));

    _this.state = {
      hoverDate: null,
      phrases: props.phrases
    };

    _this.isTouchDevice = (0, _isTouchDevice2.default)();
    _this.today = (0, _moment2.default)();

    _this.onDayClick = _this.onDayClick.bind(_this);
    _this.onDayMouseEnter = _this.onDayMouseEnter.bind(_this);
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind(_this);
    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind(_this);
    return _this;
  }

  _createClass(DayPickerRangeController, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var focusedInput = nextProps.focusedInput,
          phrases = nextProps.phrases;


      if (focusedInput !== this.props.focusedInput || phrases !== this.props.phrases) {
        // set the appropriate CalendarDay phrase based on focusedInput
        var chooseAvailableDate = phrases.chooseAvailableDate;
        if (focusedInput === _constants.START_DATE) {
          chooseAvailableDate = phrases.chooseAvailableStartDate;
        } else if (focusedInput === _constants.END_DATE) {
          chooseAvailableDate = phrases.chooseAvailableEndDate;
        }

        this.setState({
          phrases: _extends({}, phrases, {
            chooseAvailableDate: chooseAvailableDate
          })
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.today = (0, _moment2.default)();
    }
  }, {
    key: 'onDayClick',
    value: function onDayClick(day, e) {
      var _props = this.props,
          keepOpenOnDateSelect = _props.keepOpenOnDateSelect,
          minimumNights = _props.minimumNights,
          onBlur = _props.onBlur;

      if (e) e.preventDefault();
      if (this.isBlocked(day)) return;

      var _props2 = this.props,
          focusedInput = _props2.focusedInput,
          onFocusChange = _props2.onFocusChange,
          onClose = _props2.onClose;
      var _props3 = this.props,
          startDate = _props3.startDate,
          endDate = _props3.endDate;


      if (focusedInput === _constants.START_DATE) {
        onFocusChange(_constants.END_DATE);

        startDate = day;

        if ((0, _isInclusivelyAfterDay2.default)(day, endDate)) {
          endDate = null;
        }
      } else if (focusedInput === _constants.END_DATE) {
        var firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');

        if (!startDate) {
          endDate = day;
          onFocusChange(_constants.START_DATE);
        } else if ((0, _isInclusivelyAfterDay2.default)(day, firstAllowedEndDate)) {
          endDate = day;
          if (!keepOpenOnDateSelect) {
            onFocusChange(null);
            onClose({ startDate: startDate, endDate: endDate });
          }
        } else {
          startDate = day;
          endDate = null;
        }
      }

      this.props.onDatesChange({ startDate: startDate, endDate: endDate });
      onBlur();
    }
  }, {
    key: 'onDayMouseEnter',
    value: function onDayMouseEnter(day) {
      if (this.isTouchDevice) return;

      this.setState({
        hoverDate: day
      });
    }
  }, {
    key: 'onDayMouseLeave',
    value: function onDayMouseLeave() {
      if (this.isTouchDevice) return;

      this.setState({
        hoverDate: null
      });
    }
  }, {
    key: 'getFirstFocusableDay',
    value: function getFirstFocusableDay(newMonth) {
      var _this2 = this;

      var _props4 = this.props,
          startDate = _props4.startDate,
          endDate = _props4.endDate,
          focusedInput = _props4.focusedInput,
          minimumNights = _props4.minimumNights,
          numberOfMonths = _props4.numberOfMonths;


      var focusedDate = newMonth.clone().startOf('month');
      if (focusedInput === _constants.START_DATE && startDate) {
        focusedDate = startDate.clone();
      } else if (focusedInput === _constants.END_DATE && !endDate && startDate) {
        focusedDate = startDate.clone().add(minimumNights, 'days');
      } else if (focusedInput === _constants.END_DATE && endDate) {
        focusedDate = endDate.clone();
      }

      if (this.isBlocked(focusedDate)) {
        var days = [];
        var lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
        var currentDay = focusedDate.clone();
        while (!currentDay.isAfter(lastVisibleDay)) {
          currentDay = currentDay.clone().add(1, 'day');
          days.push(currentDay);
        }

        var viableDays = days.filter(function (day) {
          return !_this2.isBlocked(day) && day.isAfter(focusedDate);
        });
        if (viableDays.length > 0) focusedDate = viableDays[0];
      }

      return focusedDate;
    }
  }, {
    key: 'doesNotMeetMinimumNights',
    value: function doesNotMeetMinimumNights(day) {
      var _props5 = this.props,
          startDate = _props5.startDate,
          isOutsideRange = _props5.isOutsideRange,
          focusedInput = _props5.focusedInput,
          minimumNights = _props5.minimumNights;

      if (focusedInput !== _constants.END_DATE) return false;

      if (startDate) {
        var dayDiff = day.diff(startDate.clone().startOf('day').hour(12), 'days');
        return dayDiff < minimumNights && dayDiff >= 0;
      }
      return isOutsideRange((0, _moment2.default)(day).subtract(minimumNights, 'days'));
    }
  }, {
    key: 'isDayAfterHoveredStartDate',
    value: function isDayAfterHoveredStartDate(day) {
      var _props6 = this.props,
          startDate = _props6.startDate,
          endDate = _props6.endDate,
          minimumNights = _props6.minimumNights;
      var hoverDate = this.state.hoverDate;

      return !!startDate && !endDate && !this.isBlocked(day) && (0, _isNextDay2.default)(hoverDate, day) && minimumNights > 0 && (0, _isSameDay2.default)(hoverDate, startDate);
    }
  }, {
    key: 'isEndDate',
    value: function isEndDate(day) {
      return (0, _isSameDay2.default)(day, this.props.endDate);
    }
  }, {
    key: 'isHovered',
    value: function isHovered(day) {
      return (0, _isSameDay2.default)(day, this.state.hoverDate);
    }
  }, {
    key: 'isInHoveredSpan',
    value: function isInHoveredSpan(day) {
      var _props7 = this.props,
          startDate = _props7.startDate,
          endDate = _props7.endDate;
      var hoverDate = this.state.hoverDate;


      var isForwardRange = !!startDate && !endDate && (day.isBetween(startDate, hoverDate) || (0, _isSameDay2.default)(hoverDate, day));
      var isBackwardRange = !!endDate && !startDate && (day.isBetween(hoverDate, endDate) || (0, _isSameDay2.default)(hoverDate, day));

      var isValidDayHovered = hoverDate && !this.isBlocked(hoverDate);

      return (isForwardRange || isBackwardRange) && isValidDayHovered;
    }
  }, {
    key: 'isInSelectedSpan',
    value: function isInSelectedSpan(day) {
      var _props8 = this.props,
          startDate = _props8.startDate,
          endDate = _props8.endDate;

      return day.isBetween(startDate, endDate);
    }
  }, {
    key: 'isLastInRange',
    value: function isLastInRange(day) {
      return this.isInSelectedSpan(day) && (0, _isNextDay2.default)(day, this.props.endDate);
    }
  }, {
    key: 'isStartDate',
    value: function isStartDate(day) {
      return (0, _isSameDay2.default)(day, this.props.startDate);
    }
  }, {
    key: 'isBlocked',
    value: function isBlocked(day) {
      var _props9 = this.props,
          isDayBlocked = _props9.isDayBlocked,
          isOutsideRange = _props9.isOutsideRange;

      return isDayBlocked(day) || isOutsideRange(day) || this.doesNotMeetMinimumNights(day);
    }
  }, {
    key: 'isToday',
    value: function isToday(day) {
      return (0, _isSameDay2.default)(day, this.today);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props10 = this.props,
          isDayBlocked = _props10.isDayBlocked,
          isDayHighlighted = _props10.isDayHighlighted,
          isOutsideRange = _props10.isOutsideRange,
          numberOfMonths = _props10.numberOfMonths,
          orientation = _props10.orientation,
          monthFormat = _props10.monthFormat,
          navPrev = _props10.navPrev,
          navNext = _props10.navNext,
          onOutsideClick = _props10.onOutsideClick,
          onPrevMonthClick = _props10.onPrevMonthClick,
          onNextMonthClick = _props10.onNextMonthClick,
          withPortal = _props10.withPortal,
          enableOutsideDays = _props10.enableOutsideDays,
          initialVisibleMonth = _props10.initialVisibleMonth,
          daySize = _props10.daySize,
          focusedInput = _props10.focusedInput,
          renderDay = _props10.renderDay,
          renderCalendarInfo = _props10.renderCalendarInfo,
          startDate = _props10.startDate,
          endDate = _props10.endDate,
          onBlur = _props10.onBlur,
          isFocused = _props10.isFocused,
          showKeyboardShortcuts = _props10.showKeyboardShortcuts;
      var phrases = this.state.phrases;


      var modifiers = _extends({
        today: function today(day) {
          return _this3.isToday(day);
        },
        blocked: function blocked(day) {
          return _this3.isBlocked(day);
        },
        'blocked-calendar': function blockedCalendar(day) {
          return isDayBlocked(day);
        },
        'blocked-out-of-range': function blockedOutOfRange(day) {
          return isOutsideRange(day);
        },
        'highlighted-calendar': function highlightedCalendar(day) {
          return isDayHighlighted(day);
        },
        valid: function valid(day) {
          return !_this3.isBlocked(day);
        }

      }, startDate && {
        'selected-start': function selectedStart(day) {
          return _this3.isStartDate(day);
        }
      }, endDate && {
        'selected-end': function selectedEnd(day) {
          return _this3.isEndDate(day);
        },
        'blocked-minimum-nights': function blockedMinimumNights(day) {
          return _this3.doesNotMeetMinimumNights(day);
        }
      }, startDate && endDate && {
        'selected-span': function selectedSpan(day) {
          return _this3.isInSelectedSpan(day);
        },
        'last-in-range': function lastInRange(day) {
          return _this3.isLastInRange(day);
        }
      }, !this.isTouchDevice && {
        // before anything has been set or after both are set
        hovered: function hovered(day) {
          return _this3.isHovered(day);
        },

        // while start date has been set, but end date has not been
        'hovered-span': function hoveredSpan(day) {
          return _this3.isInHoveredSpan(day);
        },
        'after-hovered-start': function afterHoveredStart(day) {
          return _this3.isDayAfterHoveredStartDate(day);
        }
      });

      return (0, _inferno.createComponentVNode)(2, _DayPicker2.default, {
        'orientation': orientation,
        'enableOutsideDays': enableOutsideDays,
        'modifiers': modifiers,
        'numberOfMonths': numberOfMonths,
        'onDayClick': this.onDayClick,
        'onDayMouseEnter': this.onDayMouseEnter,
        'onDayMouseLeave': this.onDayMouseLeave,
        'onPrevMonthClick': onPrevMonthClick,
        'onNextMonthClick': onNextMonthClick,
        'monthFormat': monthFormat,
        'withPortal': withPortal,
        'hidden': !focusedInput,
        'initialVisibleMonth': initialVisibleMonth,
        'daySize': daySize,
        'onOutsideClick': onOutsideClick,
        'navPrev': navPrev,
        'navNext': navNext,
        'renderDay': renderDay,
        'renderCalendarInfo': renderCalendarInfo,
        'isFocused': isFocused,
        'getFirstFocusableDay': this.getFirstFocusableDay,
        'onBlur': onBlur,
        'showKeyboardShortcuts': showKeyboardShortcuts,
        'phrases': phrases
      }, null, function (ref) {
        _this3.dayPicker = ref;
      });
    }
  }]);

  return DayPickerRangeController;
}(_inferno.Component);

exports.default = DayPickerRangeController;


DayPickerRangeController.propTypes = propTypes;
DayPickerRangeController.defaultProps = defaultProps;