'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inferno = require('inferno');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _airbnbPropTypesInferno = require('../airbnb-prop-types-inferno');

var _consolidatedEvents = require('consolidated-events');

var _SingleDatePickerShape = require('../shapes/SingleDatePickerShape');

var _SingleDatePickerShape2 = _interopRequireDefault(_SingleDatePickerShape);

var _defaultPhrases = require('../defaultPhrases');

var _OutsideClickHandler = require('./OutsideClickHandler');

var _OutsideClickHandler2 = _interopRequireDefault(_OutsideClickHandler);

var _toMomentObject = require('../utils/toMomentObject');

var _toMomentObject2 = _interopRequireDefault(_toMomentObject);

var _toLocalizedDateString = require('../utils/toLocalizedDateString');

var _toLocalizedDateString2 = _interopRequireDefault(_toLocalizedDateString);

var _toISODateString = require('../utils/toISODateString');

var _toISODateString2 = _interopRequireDefault(_toISODateString);

var _getResponsiveContainerStyles = require('../utils/getResponsiveContainerStyles');

var _getResponsiveContainerStyles2 = _interopRequireDefault(_getResponsiveContainerStyles);

var _isTouchDevice = require('../utils/isTouchDevice');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

var _SingleDatePickerInput = require('./SingleDatePickerInput');

var _SingleDatePickerInput2 = _interopRequireDefault(_SingleDatePickerInput);

var _DayPicker = require('./DayPicker');

var _DayPicker2 = _interopRequireDefault(_DayPicker);

var _close = require('../svg/close');

var _close2 = _interopRequireDefault(_close);

var _isInclusivelyAfterDay = require('../utils/isInclusivelyAfterDay');

var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

var _isSameDay = require('../utils/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Portal from 'react-portal';


var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)(_SingleDatePickerShape2.default);

var defaultProps = {
  // required props for a functional interactive SingleDatePicker
  date: null,
  focused: false,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  orientation: _constants.HORIZONTAL_ORIENTATION,
  anchorDirection: _constants.ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  renderCalendarInfo: null,
  daySize: _constants.DAY_SIZE,

  // navigation related props
  navPrev: null,
  navNext: null,

  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onClose: function onClose() {},


  // day presentation and interaction related props
  renderDay: null,
  enableOutsideDays: false,
  isDayBlocked: function isDayBlocked() {
    return false;
  },
  isOutsideRange: function isOutsideRange(day) {
    return !(0, _isInclusivelyAfterDay2.default)(day, (0, _moment2.default)());
  },
  isDayHighlighted: function isDayHighlighted() {},

  // internationalization props
  displayFormat: function displayFormat() {
    return _moment2.default.localeData().longDateFormat('L');
  },
  monthFormat: 'MMMM YYYY',
  phrases: _defaultPhrases.SingleDatePickerPhrases
};

var SingleDatePicker = function (_Component) {
  _inherits(SingleDatePicker, _Component);

  function SingleDatePicker(props) {
    _classCallCheck(this, SingleDatePicker);

    var _this = _possibleConstructorReturn(this, (SingleDatePicker.__proto__ || Object.getPrototypeOf(SingleDatePicker)).call(this, props));

    _this.state = {
      dayPickerContainerStyles: {},
      hoverDate: null,
      isDayPickerFocused: false,
      isInputFocused: false
    };

    _this.today = (0, _moment2.default)();
    _this.isTouchDevice = false;

    _this.onDayMouseEnter = _this.onDayMouseEnter.bind(_this);
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind(_this);
    _this.onDayClick = _this.onDayClick.bind(_this);

    _this.onDayPickerFocus = _this.onDayPickerFocus.bind(_this);
    _this.onDayPickerBlur = _this.onDayPickerBlur.bind(_this);

    _this.onChange = _this.onChange.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onClearFocus = _this.onClearFocus.bind(_this);
    _this.clearDate = _this.clearDate.bind(_this);

    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind(_this);

    _this.responsivizePickerPosition = _this.responsivizePickerPosition.bind(_this);
    return _this;
  }

  /* istanbul ignore next */


  _createClass(SingleDatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resizeHandle = (0, _consolidatedEvents.addEventListener)(window, 'resize', this.responsivizePickerPosition, { passive: true });
      this.responsivizePickerPosition();

      if (this.props.focused) {
        this.setState({
          isInputFocused: true
        });
      }

      this.isTouchDevice = (0, _isTouchDevice2.default)();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.today = (0, _moment2.default)();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.focused && this.props.focused) {
        this.responsivizePickerPosition();
      }
    }

    /* istanbul ignore next */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _consolidatedEvents.removeEventListener)(this.resizeHandle);
    }
  }, {
    key: 'onChange',
    value: function onChange(dateString) {
      var _props = this.props,
          startDate = _props.startDate,
          isOutsideRange = _props.isOutsideRange,
          keepOpenOnDateSelect = _props.keepOpenOnDateSelect,
          onDateChange = _props.onDateChange,
          onFocusChange = _props.onFocusChange,
          onClose = _props.onClose;

      var endDate = (0, _toMomentObject2.default)(dateString, this.getDisplayFormat());

      var isValid = endDate && !isOutsideRange(endDate);
      if (isValid) {
        onDateChange(endDate);
        if (!keepOpenOnDateSelect) {
          onFocusChange({ focused: false });
          onClose({ startDate: startDate, endDate: endDate });
        }
      } else {
        onDateChange(null);
      }
    }
  }, {
    key: 'onDayClick',
    value: function onDayClick(day, e) {
      if (e) e.preventDefault();
      if (this.isBlocked(day)) return;
      var _props2 = this.props,
          onDateChange = _props2.onDateChange,
          keepOpenOnDateSelect = _props2.keepOpenOnDateSelect,
          onFocusChange = _props2.onFocusChange,
          onClose = _props2.onClose,
          startDate = _props2.startDate,
          endDate = _props2.endDate;


      onDateChange(day);
      if (!keepOpenOnDateSelect) {
        onFocusChange({ focused: null });
        onClose({ startDate: startDate, endDate: endDate });
      }
    }
  }, {
    key: 'onDayMouseEnter',
    value: function onDayMouseEnter(day) {
      this.setState({
        hoverDate: day
      });
    }
  }, {
    key: 'onDayMouseLeave',
    value: function onDayMouseLeave() {
      this.setState({
        hoverDate: null
      });
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      var _props3 = this.props,
          disabled = _props3.disabled,
          onFocusChange = _props3.onFocusChange,
          withPortal = _props3.withPortal,
          withFullScreenPortal = _props3.withFullScreenPortal;


      var moveFocusToDayPicker = withPortal || withFullScreenPortal || this.isTouchDevice;
      if (moveFocusToDayPicker) {
        this.onDayPickerFocus();
      } else {
        this.onDayPickerBlur();
      }

      if (!disabled) {
        onFocusChange({ focused: true });
      }
    }
  }, {
    key: 'onClearFocus',
    value: function onClearFocus() {
      var _props4 = this.props,
          startDate = _props4.startDate,
          endDate = _props4.endDate,
          focused = _props4.focused,
          onFocusChange = _props4.onFocusChange,
          onClose = _props4.onClose;

      if (!focused) return;

      this.setState({
        isInputFocused: false,
        isDayPickerFocused: false
      });

      onFocusChange({ focused: false });
      onClose({ startDate: startDate, endDate: endDate });
    }
  }, {
    key: 'onDayPickerFocus',
    value: function onDayPickerFocus() {
      this.setState({
        isInputFocused: false,
        isDayPickerFocused: true
      });
    }
  }, {
    key: 'onDayPickerBlur',
    value: function onDayPickerBlur() {
      this.setState({
        isInputFocused: true,
        isDayPickerFocused: false
      });
    }
  }, {
    key: 'getDateString',
    value: function getDateString(date) {
      var displayFormat = this.getDisplayFormat();
      if (date && displayFormat) {
        return date && date.format(displayFormat);
      }
      return (0, _toLocalizedDateString2.default)(date);
    }
  }, {
    key: 'getDayPickerContainerClasses',
    value: function getDayPickerContainerClasses() {
      var _props5 = this.props,
          orientation = _props5.orientation,
          withPortal = _props5.withPortal,
          withFullScreenPortal = _props5.withFullScreenPortal,
          anchorDirection = _props5.anchorDirection;
      var hoverDate = this.state.hoverDate;


      var dayPickerClassName = (0, _classnames2.default)('SingleDatePicker__picker', {
        'SingleDatePicker__picker--direction-left': anchorDirection === _constants.ANCHOR_LEFT,
        'SingleDatePicker__picker--direction-right': anchorDirection === _constants.ANCHOR_RIGHT,
        'SingleDatePicker__picker--horizontal': orientation === _constants.HORIZONTAL_ORIENTATION,
        'SingleDatePicker__picker--vertical': orientation === _constants.VERTICAL_ORIENTATION,
        'SingleDatePicker__picker--portal': withPortal || withFullScreenPortal,
        'SingleDatePicker__picker--full-screen-portal': withFullScreenPortal,
        'SingleDatePicker__picker--valid-date-hovered': hoverDate && !this.isBlocked(hoverDate)
      });

      return dayPickerClassName;
    }
  }, {
    key: 'getDisplayFormat',
    value: function getDisplayFormat() {
      var displayFormat = this.props.displayFormat;

      return typeof displayFormat === 'string' ? displayFormat : displayFormat();
    }
  }, {
    key: 'getFirstFocusableDay',
    value: function getFirstFocusableDay(newMonth) {
      var _this2 = this;

      var _props6 = this.props,
          date = _props6.date,
          numberOfMonths = _props6.numberOfMonths;


      var focusedDate = newMonth.clone().startOf('month');
      if (date) {
        focusedDate = date.clone();
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
    key: 'clearDate',
    value: function clearDate() {
      var _props7 = this.props,
          onDateChange = _props7.onDateChange,
          reopenPickerOnClearDate = _props7.reopenPickerOnClearDate,
          onFocusChange = _props7.onFocusChange;

      onDateChange(null);
      if (reopenPickerOnClearDate) {
        onFocusChange({ focused: true });
      }
    }

    /* istanbul ignore next */

  }, {
    key: 'responsivizePickerPosition',
    value: function responsivizePickerPosition() {
      var _this3 = this;

      var _props8 = this.props,
          anchorDirection = _props8.anchorDirection,
          horizontalMargin = _props8.horizontalMargin,
          withPortal = _props8.withPortal,
          withFullScreenPortal = _props8.withFullScreenPortal,
          focused = _props8.focused;
      var dayPickerContainerStyles = this.state.dayPickerContainerStyles;


      if (!focused) {
        return;
      }

      var isAnchoredLeft = anchorDirection === _constants.ANCHOR_LEFT;

      if (!withPortal && !withFullScreenPortal) {
        // kurdin's fix wrap with setTimeout of this.dayPickerContainer
        setTimeout(function () {
          var containerRect = _this3.dayPickerContainer.getBoundingClientRect();
          var currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
          var containerEdge = isAnchoredLeft ? containerRect[_constants.ANCHOR_RIGHT] : containerRect[_constants.ANCHOR_LEFT];

          _this3.setState({
            dayPickerContainerStyles: (0, _getResponsiveContainerStyles2.default)(anchorDirection, currentOffset, containerEdge, horizontalMargin)
          });
        }, 0);
      }
    }
  }, {
    key: 'isBlocked',
    value: function isBlocked(day) {
      var _props9 = this.props,
          isDayBlocked = _props9.isDayBlocked,
          isOutsideRange = _props9.isOutsideRange;

      return isDayBlocked(day) || isOutsideRange(day);
    }
  }, {
    key: 'isHovered',
    value: function isHovered(day) {
      return (0, _isSameDay2.default)(day, this.state.hoverDate);
    }
  }, {
    key: 'isSelected',
    value: function isSelected(day) {
      return (0, _isSameDay2.default)(day, this.props.date);
    }
  }, {
    key: 'isToday',
    value: function isToday(day) {
      return (0, _isSameDay2.default)(day, this.today);
    }
  }, {
    key: 'maybeRenderDayPickerWithPortal',
    value: function maybeRenderDayPickerWithPortal() {
      var _props10 = this.props,
          focused = _props10.focused,
          withPortal = _props10.withPortal,
          withFullScreenPortal = _props10.withFullScreenPortal;


      if (!focused) {
        return null;
      }

      if (withPortal || withFullScreenPortal) {
        return this.renderDayPicker();
        /*
        return (
          <Portal isOpened>
            {this.renderDayPicker()}
          </Portal>
        );
        */
      }

      return this.renderDayPicker();
    }
  }, {
    key: 'renderDayPicker',
    value: function renderDayPicker() {
      var _this4 = this;

      var _props11 = this.props,
          isDayBlocked = _props11.isDayBlocked,
          isDayHighlighted = _props11.isDayHighlighted,
          isOutsideRange = _props11.isOutsideRange,
          enableOutsideDays = _props11.enableOutsideDays,
          numberOfMonths = _props11.numberOfMonths,
          orientation = _props11.orientation,
          monthFormat = _props11.monthFormat,
          navPrev = _props11.navPrev,
          navNext = _props11.navNext,
          onPrevMonthClick = _props11.onPrevMonthClick,
          onNextMonthClick = _props11.onNextMonthClick,
          withPortal = _props11.withPortal,
          withFullScreenPortal = _props11.withFullScreenPortal,
          focused = _props11.focused,
          renderDay = _props11.renderDay,
          renderCalendarInfo = _props11.renderCalendarInfo,
          date = _props11.date,
          initialVisibleMonth = _props11.initialVisibleMonth,
          customCloseIcon = _props11.customCloseIcon,
          phrases = _props11.phrases,
          daySize = _props11.daySize;
      var _state = this.state,
          dayPickerContainerStyles = _state.dayPickerContainerStyles,
          isDayPickerFocused = _state.isDayPickerFocused;


      var modifiers = {
        today: function today(day) {
          return _this4.isToday(day);
        },
        blocked: function blocked(day) {
          return _this4.isBlocked(day);
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
          return !_this4.isBlocked(day);
        },
        hovered: function hovered(day) {
          return _this4.isHovered(day);
        },
        selected: function selected(day) {
          return _this4.isSelected(day);
        }
      };

      var onOutsideClick = !withFullScreenPortal && withPortal ? this.onClearFocus : undefined;
      var initialVisibleMonthThunk = initialVisibleMonth || function () {
        return date || (0, _moment2.default)();
      };
      var closeIcon = customCloseIcon || (0, _inferno.createComponentVNode)(2, _close2.default);

      return (0, _inferno.createVNode)(1, 'div', this.getDayPickerContainerClasses(), [(0, _inferno.createComponentVNode)(2, _DayPicker2.default, {
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
        'withPortal': withPortal || withFullScreenPortal,
        'hidden': !focused,
        'initialVisibleMonth': initialVisibleMonthThunk,
        'navPrev': navPrev,
        'navNext': navNext,
        'renderDay': renderDay,
        'renderCalendarInfo': renderCalendarInfo,
        'isFocused': isDayPickerFocused,
        'getFirstFocusableDay': this.getFirstFocusableDay,
        'onBlur': this.onDayPickerBlur,
        'phrases': phrases,
        'daySize': daySize
      }), withFullScreenPortal && (0, _inferno.createVNode)(1, 'button', 'SingleDatePicker__close', (0, _inferno.createVNode)(1, 'div', 'SingleDatePicker__close-icon', closeIcon, 0), 2, {
        'aria-label': phrases.closeDatePicker,
        'type': 'button',
        'onClick': this.onClearFocus
      })], 0, {
        'style': dayPickerContainerStyles,
        'onClick': onOutsideClick
      }, null, function (ref) {
        _this4.dayPickerContainer = ref;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props12 = this.props,
          id = _props12.id,
          placeholder = _props12.placeholder,
          disabled = _props12.disabled,
          focused = _props12.focused,
          required = _props12.required,
          showClearDate = _props12.showClearDate,
          date = _props12.date,
          phrases = _props12.phrases,
          withPortal = _props12.withPortal,
          withFullScreenPortal = _props12.withFullScreenPortal,
          screenReaderInputMessage = _props12.screenReaderInputMessage;
      var isInputFocused = this.state.isInputFocused;


      var displayValue = this.getDateString(date);
      var inputValue = (0, _toISODateString2.default)(date);

      var onOutsideClick = !withPortal && !withFullScreenPortal ? this.onClearFocus : undefined;

      return (0, _inferno.createVNode)(1, 'div', 'SingleDatePicker', (0, _inferno.createComponentVNode)(2, _OutsideClickHandler2.default, {
        'onOutsideClick': onOutsideClick,
        children: [(0, _inferno.createComponentVNode)(2, _SingleDatePickerInput2.default, {
          'id': id,
          'placeholder': placeholder,
          'focused': focused,
          'isFocused': isInputFocused,
          'disabled': disabled,
          'required': required,
          'showCaret': !withPortal && !withFullScreenPortal,
          'onClearDate': this.clearDate,
          'showClearDate': showClearDate,
          'displayValue': displayValue,
          'inputValue': inputValue,
          'onChange': this.onChange,
          'onFocus': this.onFocus,
          'onKeyDownShiftTab': this.onClearFocus,
          'onKeyDownTab': this.onClearFocus,
          'onKeyDownArrowDown': this.onDayPickerFocus,
          'screenReaderMessage': screenReaderInputMessage,
          'phrases': phrases
        }), this.maybeRenderDayPickerWithPortal()]
      }), 2);
    }
  }]);

  return SingleDatePicker;
}(_inferno.Component);

exports.default = SingleDatePicker;


SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;