'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inferno = require('inferno');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _airbnbPropTypesInferno = require('../airbnb-prop-types-inferno');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _arrowRight = require('../svg/arrow-right');

var _arrowRight2 = _interopRequireDefault(_arrowRight);

var _close = require('../svg/close');

var _close2 = _interopRequireDefault(_close);

var _calendar = require('../svg/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)({
  startDateId: _propTypes2.default.string,
  startDatePlaceholderText: _propTypes2.default.string,
  screenReaderMessage: _propTypes2.default.string,

  endDateId: _propTypes2.default.string,
  endDatePlaceholderText: _propTypes2.default.string,

  onStartDateFocus: _propTypes2.default.func,
  onEndDateFocus: _propTypes2.default.func,
  onStartDateChange: _propTypes2.default.func,
  onEndDateChange: _propTypes2.default.func,
  onStartDateShiftTab: _propTypes2.default.func,
  onEndDateTab: _propTypes2.default.func,
  onClearDates: _propTypes2.default.func,
  onArrowDown: _propTypes2.default.func,
  onQuestionMark: _propTypes2.default.func,

  startDate: _propTypes2.default.string,
  startDateValue: _propTypes2.default.string,
  endDate: _propTypes2.default.string,
  endDateValue: _propTypes2.default.string,

  isStartDateFocused: _propTypes2.default.bool,
  isEndDateFocused: _propTypes2.default.bool,
  showClearDates: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  showCaret: _propTypes2.default.bool,
  showDefaultInputIcon: _propTypes2.default.bool,
  customInputIcon: _propTypes2.default.node,
  customArrowIcon: _propTypes2.default.node,
  customCloseIcon: _propTypes2.default.node,

  // accessibility
  isFocused: _propTypes2.default.bool, // describes actual DOM focus

  // i18n
  phrases: _propTypes2.default.shape((0, _getPhrasePropTypes2.default)(_defaultPhrases.DateRangePickerInputPhrases))
});

var defaultProps = {
  startDateId: _constants.START_DATE,
  endDateId: _constants.END_DATE,
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  screenReaderMessage: '',
  onStartDateFocus: function onStartDateFocus() {},
  onEndDateFocus: function onEndDateFocus() {},
  onStartDateChange: function onStartDateChange() {},
  onEndDateChange: function onEndDateChange() {},
  onStartDateShiftTab: function onStartDateShiftTab() {},
  onEndDateTab: function onEndDateTab() {},
  onClearDates: function onClearDates() {},
  onArrowDown: function onArrowDown() {},
  onQuestionMark: function onQuestionMark() {},


  startDate: '',
  startDateValue: '',
  endDate: '',
  endDateValue: '',

  isStartDateFocused: false,
  isEndDateFocused: false,
  showClearDates: false,
  disabled: false,
  required: false,
  showCaret: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: _defaultPhrases.DateRangePickerInputPhrases
};

var DateRangePickerInput = function (_Component) {
  _inherits(DateRangePickerInput, _Component);

  function DateRangePickerInput(props) {
    _classCallCheck(this, DateRangePickerInput);

    var _this = _possibleConstructorReturn(this, (DateRangePickerInput.__proto__ || Object.getPrototypeOf(DateRangePickerInput)).call(this, props));

    _this.state = {
      isClearDatesHovered: false
    };

    _this.onClearDatesMouseEnter = _this.onClearDatesMouseEnter.bind(_this);
    _this.onClearDatesMouseLeave = _this.onClearDatesMouseLeave.bind(_this);
    return _this;
  }

  _createClass(DateRangePickerInput, [{
    key: 'onClearDatesMouseEnter',
    value: function onClearDatesMouseEnter() {
      this.setState({
        isClearDatesHovered: true
      });
    }
  }, {
    key: 'onClearDatesMouseLeave',
    value: function onClearDatesMouseLeave() {
      this.setState({
        isClearDatesHovered: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var isClearDatesHovered = this.state.isClearDatesHovered;
      var _props = this.props,
          startDate = _props.startDate,
          startDateValue = _props.startDateValue,
          startDateId = _props.startDateId,
          startDatePlaceholderText = _props.startDatePlaceholderText,
          screenReaderMessage = _props.screenReaderMessage,
          isStartDateFocused = _props.isStartDateFocused,
          onStartDateChange = _props.onStartDateChange,
          onStartDateFocus = _props.onStartDateFocus,
          onStartDateShiftTab = _props.onStartDateShiftTab,
          endDate = _props.endDate,
          endDateValue = _props.endDateValue,
          endDateId = _props.endDateId,
          endDatePlaceholderText = _props.endDatePlaceholderText,
          isEndDateFocused = _props.isEndDateFocused,
          onEndDateChange = _props.onEndDateChange,
          onEndDateFocus = _props.onEndDateFocus,
          onEndDateTab = _props.onEndDateTab,
          onArrowDown = _props.onArrowDown,
          onQuestionMark = _props.onQuestionMark,
          onClearDates = _props.onClearDates,
          showClearDates = _props.showClearDates,
          disabled = _props.disabled,
          required = _props.required,
          showCaret = _props.showCaret,
          showDefaultInputIcon = _props.showDefaultInputIcon,
          customInputIcon = _props.customInputIcon,
          customArrowIcon = _props.customArrowIcon,
          customCloseIcon = _props.customCloseIcon,
          isFocused = _props.isFocused,
          phrases = _props.phrases;


      var inputIcon = customInputIcon || (0, _inferno.createComponentVNode)(2, _calendar2.default);
      var arrowIcon = customArrowIcon || (0, _inferno.createComponentVNode)(2, _arrowRight2.default);
      var closeIcon = customCloseIcon || (0, _inferno.createComponentVNode)(2, _close2.default);

      var screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;

      return (0, _inferno.createVNode)(1, 'div', (0, _classnames2.default)('DateRangePickerInput', {
        'DateRangePickerInput--disabled': disabled
      }), [(showDefaultInputIcon || customInputIcon !== null) && (0, _inferno.createVNode)(1, 'button', 'DateRangePickerInput__calendar-icon', inputIcon, 0, {
        'type': 'button',
        'aria-label': phrases.focusStartDate,
        'onClick': onArrowDown
      }), (0, _inferno.createComponentVNode)(2, _DateInput2.default, {
        'id': startDateId,
        'placeholder': startDatePlaceholderText,
        'displayValue': startDate,
        'inputValue': startDateValue,
        'screenReaderMessage': screenReaderText,
        'focused': isStartDateFocused,
        'isFocused': isFocused,
        'disabled': disabled,
        'required': required,
        'showCaret': showCaret,
        'onChange': onStartDateChange,
        'onFocus': onStartDateFocus,
        'onKeyDownShiftTab': onStartDateShiftTab,
        'onKeyDownArrowDown': onArrowDown,
        'onKeyDownQuestionMark': onQuestionMark
      }), (0, _inferno.createVNode)(1, 'div', 'DateRangePickerInput__arrow', arrowIcon, 0, {
        'aria-hidden': 'true',
        'role': 'presentation'
      }), (0, _inferno.createComponentVNode)(2, _DateInput2.default, {
        'id': endDateId,
        'placeholder': endDatePlaceholderText,
        'displayValue': endDate,
        'inputValue': endDateValue,
        'screenReaderMessage': screenReaderText,
        'focused': isEndDateFocused,
        'isFocused': isFocused,
        'disabled': disabled,
        'required': required,
        'showCaret': showCaret,
        'onChange': onEndDateChange,
        'onFocus': onEndDateFocus,
        'onKeyDownTab': onEndDateTab,
        'onKeyDownArrowDown': onArrowDown,
        'onKeyDownQuestionMark': onQuestionMark
      }), showClearDates && (0, _inferno.createVNode)(1, 'button', (0, _classnames2.default)('DateRangePickerInput__clear-dates', {
        'DateRangePickerInput__clear-dates--hide': !(startDate || endDate),
        'DateRangePickerInput__clear-dates--hover': isClearDatesHovered
      }), (0, _inferno.createVNode)(1, 'div', 'DateRangePickerInput__close-icon', closeIcon, 0), 2, {
        'type': 'button',
        'aria-label': phrases.clearDates,
        'onMouseEnter': this.onClearDatesMouseEnter,
        'onMouseLeave': this.onClearDatesMouseLeave,
        'onClick': onClearDates
      })], 0);
    }
  }]);

  return DateRangePickerInput;
}(_inferno.Component);

exports.default = DateRangePickerInput;


DateRangePickerInput.propTypes = propTypes;
DateRangePickerInput.defaultProps = defaultProps;