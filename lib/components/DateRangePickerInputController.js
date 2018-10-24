'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inferno = require('inferno');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentProptypesInferno = require('../moment-proptypes-inferno');

var _momentProptypesInferno2 = _interopRequireDefault(_momentProptypesInferno);

var _airbnbPropTypesInferno = require('../airbnb-prop-types-inferno');

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _DateRangePickerInput = require('./DateRangePickerInput');

var _DateRangePickerInput2 = _interopRequireDefault(_DateRangePickerInput);

var _toMomentObject = require('../utils/toMomentObject');

var _toMomentObject2 = _interopRequireDefault(_toMomentObject);

var _toLocalizedDateString = require('../utils/toLocalizedDateString');

var _toLocalizedDateString2 = _interopRequireDefault(_toLocalizedDateString);

var _toISODateString = require('../utils/toISODateString');

var _toISODateString2 = _interopRequireDefault(_toISODateString);

var _isInclusivelyAfterDay = require('../utils/isInclusivelyAfterDay');

var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

var _isInclusivelyBeforeDay = require('../utils/isInclusivelyBeforeDay');

var _isInclusivelyBeforeDay2 = _interopRequireDefault(_isInclusivelyBeforeDay);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)({
  startDate: _momentProptypesInferno2.default.momentObj,
  startDateId: _propTypes2.default.string,
  startDatePlaceholderText: _propTypes2.default.string,
  isStartDateFocused: _propTypes2.default.bool,

  endDate: _momentProptypesInferno2.default.momentObj,
  endDateId: _propTypes2.default.string,
  endDatePlaceholderText: _propTypes2.default.string,
  isEndDateFocused: _propTypes2.default.bool,

  screenReaderMessage: _propTypes2.default.string,
  showClearDates: _propTypes2.default.bool,
  showCaret: _propTypes2.default.bool,
  showDefaultInputIcon: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  required: _propTypes2.default.bool,

  keepOpenOnDateSelect: _propTypes2.default.bool,
  reopenPickerOnClearDates: _propTypes2.default.bool,
  withFullScreenPortal: _propTypes2.default.bool,
  isOutsideRange: _propTypes2.default.func,
  displayFormat: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),

  onFocusChange: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  onDatesChange: _propTypes2.default.func,
  onArrowDown: _propTypes2.default.func,
  onQuestionMark: _propTypes2.default.func,

  customInputIcon: _propTypes2.default.node,
  customArrowIcon: _propTypes2.default.node,
  customCloseIcon: _propTypes2.default.node,

  // accessibility
  isFocused: _propTypes2.default.bool,

  // i18n
  phrases: _propTypes2.default.shape((0, _getPhrasePropTypes2.default)(_defaultPhrases.DateRangePickerInputPhrases))
});

var defaultProps = {
  startDate: null,
  startDateId: _constants.START_DATE,
  startDatePlaceholderText: 'Start Date',
  isStartDateFocused: false,

  endDate: null,
  endDateId: _constants.END_DATE,
  endDatePlaceholderText: 'End Date',
  isEndDateFocused: false,

  screenReaderMessage: '',
  showClearDates: false,
  showCaret: false,
  showDefaultInputIcon: false,
  disabled: false,
  required: false,

  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  withFullScreenPortal: false,
  isOutsideRange: function isOutsideRange(day) {
    return !(0, _isInclusivelyAfterDay2.default)(day, (0, _moment2.default)());
  },
  displayFormat: function displayFormat() {
    return _moment2.default.localeData().longDateFormat('L');
  },

  onFocusChange: function onFocusChange() {},
  onClose: function onClose() {},
  onDatesChange: function onDatesChange() {},
  onArrowDown: function onArrowDown() {},
  onQuestionMark: function onQuestionMark() {},


  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: _defaultPhrases.DateRangePickerInputPhrases
};

var DateRangePickerInputController = function (_Component) {
  _inherits(DateRangePickerInputController, _Component);

  function DateRangePickerInputController(props) {
    _classCallCheck(this, DateRangePickerInputController);

    var _this = _possibleConstructorReturn(this, (DateRangePickerInputController.__proto__ || Object.getPrototypeOf(DateRangePickerInputController)).call(this, props));

    _this.onClearFocus = _this.onClearFocus.bind(_this);
    _this.onStartDateChange = _this.onStartDateChange.bind(_this);
    _this.onStartDateFocus = _this.onStartDateFocus.bind(_this);
    _this.onEndDateChange = _this.onEndDateChange.bind(_this);
    _this.onEndDateFocus = _this.onEndDateFocus.bind(_this);
    _this.clearDates = _this.clearDates.bind(_this);
    return _this;
  }

  _createClass(DateRangePickerInputController, [{
    key: 'onClearFocus',
    value: function onClearFocus() {
      var _props = this.props,
          onFocusChange = _props.onFocusChange,
          onClose = _props.onClose,
          startDate = _props.startDate,
          endDate = _props.endDate;


      onFocusChange(null);
      onClose({ startDate: startDate, endDate: endDate });
    }
  }, {
    key: 'onEndDateChange',
    value: function onEndDateChange(endDateString) {
      var _props2 = this.props,
          startDate = _props2.startDate,
          isOutsideRange = _props2.isOutsideRange,
          keepOpenOnDateSelect = _props2.keepOpenOnDateSelect,
          onDatesChange = _props2.onDatesChange;


      var endDate = (0, _toMomentObject2.default)(endDateString, this.getDisplayFormat());

      var isEndDateValid = endDate && !isOutsideRange(endDate) && !(0, _isInclusivelyBeforeDay2.default)(endDate, startDate);
      if (isEndDateValid) {
        onDatesChange({ startDate: startDate, endDate: endDate });
        if (!keepOpenOnDateSelect) this.onClearFocus();
      } else {
        onDatesChange({
          startDate: startDate,
          endDate: null
        });
      }
    }
  }, {
    key: 'onEndDateFocus',
    value: function onEndDateFocus() {
      var _props3 = this.props,
          startDate = _props3.startDate,
          onFocusChange = _props3.onFocusChange,
          withFullScreenPortal = _props3.withFullScreenPortal,
          disabled = _props3.disabled;


      if (!startDate && withFullScreenPortal && !disabled) {
        // When the datepicker is full screen, we never want to focus the end date first
        // because there's no indication that that is the case once the datepicker is open and it
        // might confuse the user
        onFocusChange(_constants.START_DATE);
      } else if (!disabled) {
        onFocusChange(_constants.END_DATE);
      }
    }
  }, {
    key: 'onStartDateChange',
    value: function onStartDateChange(startDateString) {
      var startDate = (0, _toMomentObject2.default)(startDateString, this.getDisplayFormat());

      var endDate = this.props.endDate;
      var _props4 = this.props,
          isOutsideRange = _props4.isOutsideRange,
          onDatesChange = _props4.onDatesChange,
          onFocusChange = _props4.onFocusChange;

      var isStartDateValid = startDate && !isOutsideRange(startDate);
      if (isStartDateValid) {
        if ((0, _isInclusivelyBeforeDay2.default)(endDate, startDate)) {
          endDate = null;
        }

        onDatesChange({ startDate: startDate, endDate: endDate });
        onFocusChange(_constants.END_DATE);
      } else {
        onDatesChange({
          startDate: null,
          endDate: endDate
        });
      }
    }
  }, {
    key: 'onStartDateFocus',
    value: function onStartDateFocus() {
      if (!this.props.disabled) {
        this.props.onFocusChange(_constants.START_DATE);
      }
    }
  }, {
    key: 'getDisplayFormat',
    value: function getDisplayFormat() {
      var displayFormat = this.props.displayFormat;

      return typeof displayFormat === 'string' ? displayFormat : displayFormat();
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
    key: 'clearDates',
    value: function clearDates() {
      var _props5 = this.props,
          onDatesChange = _props5.onDatesChange,
          reopenPickerOnClearDates = _props5.reopenPickerOnClearDates,
          onFocusChange = _props5.onFocusChange;

      onDatesChange({ startDate: null, endDate: null });
      if (reopenPickerOnClearDates) {
        onFocusChange(_constants.START_DATE);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          startDate = _props6.startDate,
          startDateId = _props6.startDateId,
          startDatePlaceholderText = _props6.startDatePlaceholderText,
          isStartDateFocused = _props6.isStartDateFocused,
          endDate = _props6.endDate,
          endDateId = _props6.endDateId,
          endDatePlaceholderText = _props6.endDatePlaceholderText,
          isEndDateFocused = _props6.isEndDateFocused,
          screenReaderMessage = _props6.screenReaderMessage,
          showClearDates = _props6.showClearDates,
          showCaret = _props6.showCaret,
          showDefaultInputIcon = _props6.showDefaultInputIcon,
          customInputIcon = _props6.customInputIcon,
          customArrowIcon = _props6.customArrowIcon,
          customCloseIcon = _props6.customCloseIcon,
          disabled = _props6.disabled,
          required = _props6.required,
          isFocused = _props6.isFocused,
          phrases = _props6.phrases,
          onArrowDown = _props6.onArrowDown,
          onQuestionMark = _props6.onQuestionMark;


      var startDateString = this.getDateString(startDate);
      var startDateValue = (0, _toISODateString2.default)(startDate);
      var endDateString = this.getDateString(endDate);
      var endDateValue = (0, _toISODateString2.default)(endDate);

      return (0, _inferno.createComponentVNode)(2, _DateRangePickerInput2.default, {
        'startDate': startDateString,
        'startDateValue': startDateValue,
        'startDateId': startDateId,
        'startDatePlaceholderText': startDatePlaceholderText,
        'isStartDateFocused': isStartDateFocused,
        'endDate': endDateString,
        'endDateValue': endDateValue,
        'endDateId': endDateId,
        'endDatePlaceholderText': endDatePlaceholderText,
        'isEndDateFocused': isEndDateFocused,
        'isFocused': isFocused,
        'disabled': disabled,
        'required': required,
        'showCaret': showCaret,
        'showDefaultInputIcon': showDefaultInputIcon,
        'customInputIcon': customInputIcon,
        'customArrowIcon': customArrowIcon,
        'customCloseIcon': customCloseIcon,
        'phrases': phrases,
        'onStartDateChange': this.onStartDateChange,
        'onStartDateFocus': this.onStartDateFocus,
        'onStartDateShiftTab': this.onClearFocus,
        'onEndDateChange': this.onEndDateChange,
        'onEndDateFocus': this.onEndDateFocus,
        'onEndDateTab': this.onClearFocus,
        'showClearDates': showClearDates,
        'onClearDates': this.clearDates,
        'screenReaderMessage': screenReaderMessage,
        'onArrowDown': onArrowDown,
        'onQuestionMark': onQuestionMark
      });
    }
  }]);

  return DateRangePickerInputController;
}(_inferno.Component);

exports.default = DateRangePickerInputController;


DateRangePickerInputController.propTypes = propTypes;
DateRangePickerInputController.defaultProps = defaultProps;