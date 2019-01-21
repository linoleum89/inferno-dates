'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inferno = require('inferno');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _airbnbPropTypesInferno = require('../airbnb-prop-types-inferno');

var _consolidatedEvents = require('consolidated-events');

var _defaultPhrases = require('../defaultPhrases');

var _OutsideClickHandler = require('./OutsideClickHandler');

var _OutsideClickHandler2 = _interopRequireDefault(_OutsideClickHandler);

var _getResponsiveContainerStyles = require('../utils/getResponsiveContainerStyles');

var _getResponsiveContainerStyles2 = _interopRequireDefault(_getResponsiveContainerStyles);

var _findDOMNode = require('../utils/findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _isTouchDevice = require('../utils/isTouchDevice');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

var _isInclusivelyAfterDay = require('../utils/isInclusivelyAfterDay');

var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

var _DateRangePickerInputController = require('./DateRangePickerInputController');

var _DateRangePickerInputController2 = _interopRequireDefault(_DateRangePickerInputController);

var _DayPickerRangeController = require('./DayPickerRangeController');

var _DayPickerRangeController2 = _interopRequireDefault(_DayPickerRangeController);

var _close = require('../svg/close');

var _close2 = _interopRequireDefault(_close);

var _DateRangePickerShape = require('../shapes/DateRangePickerShape');

var _DateRangePickerShape2 = _interopRequireDefault(_DateRangePickerShape);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Portal from 'react-portal';


var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)(_DateRangePickerShape2.default);

var defaultProps = {
  // required props for a functional interactive DateRangePicker
  startDate: null,
  endDate: null,
  focusedInput: null,

  // input related props
  startDateId: _constants.START_DATE,
  startDatePlaceholderText: 'Start Date',
  endDateId: _constants.END_DATE,
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
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
  reopenPickerOnClearDates: false,
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
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: function isDayBlocked() {
    return false;
  },
  isOutsideRange: function isOutsideRange(day) {
    return !(0, _isInclusivelyAfterDay2.default)(day, (0, _moment2.default)());
  },
  isDayHighlighted: function isDayHighlighted() {
    return false;
  },

  // internationalization
  displayFormat: function displayFormat() {
    return _moment2.default.localeData().longDateFormat('L');
  },
  monthFormat: 'MMMM YYYY',
  phrases: _defaultPhrases.DateRangePickerPhrases
};

var DateRangePicker = function (_Component) {
  _inherits(DateRangePicker, _Component);

  function DateRangePicker(props) {
    _classCallCheck(this, DateRangePicker);

    var _this = _possibleConstructorReturn(this, (DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call(this, props));

    _this.state = {
      dayPickerContainerStyles: {},
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false
    };

    _this.isTouchDevice = false;

    _this.onOutsideClick = _this.onOutsideClick.bind(_this);
    _this.onDateRangePickerInputFocus = _this.onDateRangePickerInputFocus.bind(_this);
    _this.onDayPickerFocus = _this.onDayPickerFocus.bind(_this);
    _this.onDayPickerBlur = _this.onDayPickerBlur.bind(_this);
    _this.showKeyboardShortcutsPanel = _this.showKeyboardShortcutsPanel.bind(_this);

    _this.responsivizePickerPosition = _this.responsivizePickerPosition.bind(_this);
    return _this;
  }

  _createClass(DateRangePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resizeHandle = (0, _consolidatedEvents.addEventListener)(window, 'resize', this.responsivizePickerPosition, { passive: true });
      this.responsivizePickerPosition();

      if (this.props.focusedInput) {
        this.setState({
          isDateRangePickerInputFocused: true
        });
      }

      this.isTouchDevice = (0, _isTouchDevice2.default)();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.focusedInput && this.props.focusedInput && this.isOpened()) {
        // The date picker just changed from being closed to being open.
        this.responsivizePickerPosition();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.resizeHandle) (0, _consolidatedEvents.removeEventListener)(this.resizeHandle);
    }
  }, {
    key: 'onOutsideClick',
    value: function onOutsideClick() {
      var _props = this.props,
          onFocusChange = _props.onFocusChange,
          onClose = _props.onClose,
          startDate = _props.startDate,
          endDate = _props.endDate;

      if (!this.isOpened()) return;

      this.setState({
        isDateRangePickerInputFocused: false,
        isDayPickerFocused: false,
        showKeyboardShortcuts: false
      });

      onFocusChange(null);
      onClose({ startDate: startDate, endDate: endDate });
    }
  }, {
    key: 'onDateRangePickerInputFocus',
    value: function onDateRangePickerInputFocus(focusedInput) {
      var _props2 = this.props,
          onFocusChange = _props2.onFocusChange,
          withPortal = _props2.withPortal,
          withFullScreenPortal = _props2.withFullScreenPortal;


      if (focusedInput) {
        var moveFocusToDayPicker = withPortal || withFullScreenPortal || this.isTouchDevice;
        if (moveFocusToDayPicker) {
          this.onDayPickerFocus();
        } else {
          this.onDayPickerBlur();
        }
      }

      onFocusChange(focusedInput);
    }
  }, {
    key: 'onDayPickerFocus',
    value: function onDayPickerFocus() {
      var _props3 = this.props,
          focusedInput = _props3.focusedInput,
          onFocusChange = _props3.onFocusChange;

      if (!focusedInput) onFocusChange(_constants.START_DATE);

      this.setState({
        isDateRangePickerInputFocused: false,
        isDayPickerFocused: true,
        showKeyboardShortcuts: false
      });
    }
  }, {
    key: 'onDayPickerBlur',
    value: function onDayPickerBlur() {
      this.setState({
        isDateRangePickerInputFocused: true,
        isDayPickerFocused: false,
        showKeyboardShortcuts: false
      });
    }
  }, {
    key: 'getDayPickerContainerClasses',
    value: function getDayPickerContainerClasses() {
      var _props4 = this.props,
          orientation = _props4.orientation,
          withPortal = _props4.withPortal,
          withFullScreenPortal = _props4.withFullScreenPortal,
          anchorDirection = _props4.anchorDirection;

      var dayPickerClassName = (0, _classnames2.default)('DateRangePicker__picker', {
        'DateRangePicker__picker--direction-left': anchorDirection === _constants.ANCHOR_LEFT,
        'DateRangePicker__picker--direction-right': anchorDirection === _constants.ANCHOR_RIGHT,
        'DateRangePicker__picker--horizontal': orientation === _constants.HORIZONTAL_ORIENTATION,
        'DateRangePicker__picker--vertical': orientation === _constants.VERTICAL_ORIENTATION,
        'DateRangePicker__picker--portal': withPortal || withFullScreenPortal,
        'DateRangePicker__picker--full-screen-portal': withFullScreenPortal
      });

      return dayPickerClassName;
    }
  }, {
    key: 'getDayPickerDOMNode',
    value: function getDayPickerDOMNode() {
      return (0, _findDOMNode2.default)(this.dayPicker); // eslint-disable-line react/no-find-dom-node
    }
  }, {
    key: 'isOpened',
    value: function isOpened() {
      var focusedInput = this.props.focusedInput;

      return focusedInput === _constants.START_DATE || focusedInput === _constants.END_DATE;
    }
  }, {
    key: 'responsivizePickerPosition',
    value: function responsivizePickerPosition() {
      var _this2 = this;

      if (!this.isOpened()) {
        return;
      }

      var _props5 = this.props,
          anchorDirection = _props5.anchorDirection,
          horizontalMargin = _props5.horizontalMargin,
          withPortal = _props5.withPortal,
          withFullScreenPortal = _props5.withFullScreenPortal;
      var dayPickerContainerStyles = this.state.dayPickerContainerStyles;


      var isAnchoredLeft = anchorDirection === _constants.ANCHOR_LEFT;

      if (!withPortal && !withFullScreenPortal) {
        // kurdin's fix wrap with setTimeout of this.dayPickerContainer
        setTimeout(function () {
          var containerRect = _this2.dayPickerContainer.getBoundingClientRect();
          var currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
          var containerEdge = isAnchoredLeft ? containerRect[_constants.ANCHOR_RIGHT] : containerRect[_constants.ANCHOR_LEFT];

          _this2.setState({
            dayPickerContainerStyles: (0, _getResponsiveContainerStyles2.default)(anchorDirection, currentOffset, containerEdge, horizontalMargin)
          });
        }, 0);
      }
    }
  }, {
    key: 'showKeyboardShortcutsPanel',
    value: function showKeyboardShortcutsPanel() {
      this.setState({
        isDateRangePickerInputFocused: false,
        isDayPickerFocused: true,
        showKeyboardShortcuts: true
      });
    }
  }, {
    key: 'maybeRenderDayPickerWithPortal',
    value: function maybeRenderDayPickerWithPortal() {
      var _props6 = this.props,
          withPortal = _props6.withPortal,
          withFullScreenPortal = _props6.withFullScreenPortal;


      if (!this.isOpened()) {
        return null;
      }

      {/*
        if (withPortal || withFullScreenPortal) {
         return (
             <Portal isOpened>
             {this.renderDayPicker()}
           </Portal>
           
         );
        }
        */}

      return this.renderDayPicker();
    }
  }, {
    key: 'renderDayPicker',
    value: function renderDayPicker() {
      var _this3 = this;

      var _props7 = this.props,
          isDayBlocked = _props7.isDayBlocked,
          isDayHighlighted = _props7.isDayHighlighted,
          isOutsideRange = _props7.isOutsideRange,
          numberOfMonths = _props7.numberOfMonths,
          orientation = _props7.orientation,
          monthFormat = _props7.monthFormat,
          navPrev = _props7.navPrev,
          navNext = _props7.navNext,
          onPrevMonthClick = _props7.onPrevMonthClick,
          onNextMonthClick = _props7.onNextMonthClick,
          onDatesChange = _props7.onDatesChange,
          onFocusChange = _props7.onFocusChange,
          withPortal = _props7.withPortal,
          withFullScreenPortal = _props7.withFullScreenPortal,
          daySize = _props7.daySize,
          enableOutsideDays = _props7.enableOutsideDays,
          focusedInput = _props7.focusedInput,
          startDate = _props7.startDate,
          endDate = _props7.endDate,
          minimumNights = _props7.minimumNights,
          keepOpenOnDateSelect = _props7.keepOpenOnDateSelect,
          renderDay = _props7.renderDay,
          renderCalendarInfo = _props7.renderCalendarInfo,
          initialVisibleMonth = _props7.initialVisibleMonth,
          customCloseIcon = _props7.customCloseIcon,
          onClose = _props7.onClose,
          phrases = _props7.phrases;
      var _state = this.state,
          dayPickerContainerStyles = _state.dayPickerContainerStyles,
          isDayPickerFocused = _state.isDayPickerFocused,
          showKeyboardShortcuts = _state.showKeyboardShortcuts;


      var onOutsideClick = !withFullScreenPortal && withPortal ? this.onOutsideClick : undefined;
      var initialVisibleMonthThunk = initialVisibleMonth || function () {
        return startDate || endDate || (0, _moment2.default)();
      };

      var closeIcon = customCloseIcon || (0, _inferno.createComponentVNode)(2, _close2.default);
      return (0, _inferno.createVNode)(1, 'div', this.getDayPickerContainerClasses(), [(0, _inferno.createComponentVNode)(2, _DayPickerRangeController2.default, {
        'orientation': orientation,
        'enableOutsideDays': enableOutsideDays,
        'numberOfMonths': numberOfMonths,
        'onPrevMonthClick': onPrevMonthClick,
        'onNextMonthClick': onNextMonthClick,
        'onDatesChange': onDatesChange,
        'onFocusChange': onFocusChange,
        'onClose': onClose,
        'focusedInput': focusedInput,
        'startDate': startDate,
        'endDate': endDate,
        'monthFormat': monthFormat,
        'withPortal': withPortal || withFullScreenPortal,
        'daySize': daySize,
        'initialVisibleMonth': initialVisibleMonthThunk,
        'navPrev': navPrev,
        'navNext': navNext,
        'minimumNights': minimumNights,
        'isOutsideRange': isOutsideRange,
        'isDayHighlighted': isDayHighlighted,
        'isDayBlocked': isDayBlocked,
        'keepOpenOnDateSelect': keepOpenOnDateSelect,
        'renderDay': renderDay,
        'renderCalendarInfo': renderCalendarInfo,
        'isFocused': isDayPickerFocused,
        'showKeyboardShortcuts': showKeyboardShortcuts,
        'onBlur': this.onDayPickerBlur,
        'phrases': phrases
      }, null, function (ref) {
        _this3.dayPicker = ref;
      }), withFullScreenPortal && (0, _inferno.createVNode)(1, 'button', 'DateRangePicker__close', (0, _inferno.createVNode)(1, 'div', 'DateRangePicker__close', closeIcon, 0), 2, {
        'type': 'button',
        'onClick': this.onOutsideClick,
        'aria-label': phrases.closeDatePicker
      })], 0, {
        'style': dayPickerContainerStyles,
        'onClick': onOutsideClick
      }, null, function (ref) {
        _this3.dayPickerContainer = ref;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props8 = this.props,
          startDate = _props8.startDate,
          startDateId = _props8.startDateId,
          startDatePlaceholderText = _props8.startDatePlaceholderText,
          endDate = _props8.endDate,
          endDateId = _props8.endDateId,
          endDatePlaceholderText = _props8.endDatePlaceholderText,
          focusedInput = _props8.focusedInput,
          screenReaderInputMessage = _props8.screenReaderInputMessage,
          showClearDates = _props8.showClearDates,
          showDefaultInputIcon = _props8.showDefaultInputIcon,
          customInputIcon = _props8.customInputIcon,
          customArrowIcon = _props8.customArrowIcon,
          customCloseIcon = _props8.customCloseIcon,
          disabled = _props8.disabled,
          required = _props8.required,
          phrases = _props8.phrases,
          isOutsideRange = _props8.isOutsideRange,
          withPortal = _props8.withPortal,
          withFullScreenPortal = _props8.withFullScreenPortal,
          displayFormat = _props8.displayFormat,
          reopenPickerOnClearDates = _props8.reopenPickerOnClearDates,
          keepOpenOnDateSelect = _props8.keepOpenOnDateSelect,
          onDatesChange = _props8.onDatesChange,
          onClose = _props8.onClose;
      var isDateRangePickerInputFocused = this.state.isDateRangePickerInputFocused;


      var onOutsideClick = !withPortal && !withFullScreenPortal ? this.onOutsideClick : undefined;

      return (0, _inferno.createVNode)(1, 'div', 'DateRangePicker', (0, _inferno.createComponentVNode)(2, _OutsideClickHandler2.default, {
        'onOutsideClick': onOutsideClick,
        children: [(0, _inferno.createComponentVNode)(2, _DateRangePickerInputController2.default, {
          'startDate': startDate,
          'startDateId': startDateId,
          'startDatePlaceholderText': startDatePlaceholderText,
          'isStartDateFocused': focusedInput === _constants.START_DATE,
          'endDate': endDate,
          'endDateId': endDateId,
          'endDatePlaceholderText': endDatePlaceholderText,
          'isEndDateFocused': focusedInput === _constants.END_DATE,
          'displayFormat': displayFormat,
          'showClearDates': showClearDates,
          'showCaret': !withPortal && !withFullScreenPortal,
          'showDefaultInputIcon': showDefaultInputIcon,
          'customInputIcon': customInputIcon,
          'customArrowIcon': customArrowIcon,
          'customCloseIcon': customCloseIcon,
          'disabled': disabled,
          'required': required,
          'reopenPickerOnClearDates': reopenPickerOnClearDates,
          'keepOpenOnDateSelect': keepOpenOnDateSelect,
          'isOutsideRange': isOutsideRange,
          'withFullScreenPortal': withFullScreenPortal,
          'onDatesChange': onDatesChange,
          'onFocusChange': this.onDateRangePickerInputFocus,
          'onArrowDown': this.onDayPickerFocus,
          'onQuestionMark': this.showKeyboardShortcutsPanel,
          'onClose': onClose,
          'phrases': phrases,
          'screenReaderMessage': screenReaderInputMessage,
          'isFocused': isDateRangePickerInputFocused
        }), this.maybeRenderDayPickerWithPortal()]
      }), 2);
    }
  }]);

  return DateRangePicker;
}(_inferno.Component);

exports.default = DateRangePicker;


DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;