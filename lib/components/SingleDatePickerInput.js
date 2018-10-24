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

var _close = require('../svg/close');

var _close2 = _interopRequireDefault(_close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)({
  id: _propTypes2.default.string.isRequired,
  placeholder: _propTypes2.default.string, // also used as label
  displayValue: _propTypes2.default.string,
  inputValue: _propTypes2.default.string,
  screenReaderMessage: _propTypes2.default.string,
  focused: _propTypes2.default.bool,
  isFocused: _propTypes2.default.bool, // describes actual DOM focus
  disabled: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  showCaret: _propTypes2.default.bool,
  showClearDate: _propTypes2.default.bool,
  customCloseIcon: _propTypes2.default.node,

  onChange: _propTypes2.default.func,
  onClearDate: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onKeyDownShiftTab: _propTypes2.default.func,
  onKeyDownTab: _propTypes2.default.func,
  onKeyDownArrowDown: _propTypes2.default.func,

  // i18n
  phrases: _propTypes2.default.shape((0, _getPhrasePropTypes2.default)(_defaultPhrases.SingleDatePickerInputPhrases))
});

var defaultProps = {
  placeholder: 'Select Date',
  displayValue: '',
  inputValue: '',
  screenReaderMessage: '',
  focused: false,
  isFocused: false,
  disabled: false,
  required: false,
  showCaret: false,
  showClearDate: false,
  customCloseIcon: null,

  onChange: function onChange() {},
  onClearDate: function onClearDate() {},
  onFocus: function onFocus() {},
  onKeyDownShiftTab: function onKeyDownShiftTab() {},
  onKeyDownTab: function onKeyDownTab() {},
  onKeyDownArrowDown: function onKeyDownArrowDown() {},


  // i18n
  phrases: _defaultPhrases.SingleDatePickerInputPhrases
};

var SingleDatePickerInput = function (_Component) {
  _inherits(SingleDatePickerInput, _Component);

  function SingleDatePickerInput(props) {
    _classCallCheck(this, SingleDatePickerInput);

    var _this = _possibleConstructorReturn(this, (SingleDatePickerInput.__proto__ || Object.getPrototypeOf(SingleDatePickerInput)).call(this, props));

    _this.state = {
      isClearDateHovered: false
    };

    _this.onClearDateMouseEnter = _this.onClearDateMouseEnter.bind(_this);
    _this.onClearDateMouseLeave = _this.onClearDateMouseLeave.bind(_this);
    return _this;
  }

  _createClass(SingleDatePickerInput, [{
    key: 'onClearDateMouseEnter',
    value: function onClearDateMouseEnter() {
      this.setState({
        isClearDateHovered: true
      });
    }
  }, {
    key: 'onClearDateMouseLeave',
    value: function onClearDateMouseLeave() {
      this.setState({
        isClearDateHovered: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var isClearDateHovered = this.state.isClearDateHovered;
      var _props = this.props,
          id = _props.id,
          placeholder = _props.placeholder,
          displayValue = _props.displayValue,
          inputValue = _props.inputValue,
          focused = _props.focused,
          isFocused = _props.isFocused,
          disabled = _props.disabled,
          required = _props.required,
          showCaret = _props.showCaret,
          showClearDate = _props.showClearDate,
          phrases = _props.phrases,
          onClearDate = _props.onClearDate,
          onChange = _props.onChange,
          onFocus = _props.onFocus,
          onKeyDownShiftTab = _props.onKeyDownShiftTab,
          onKeyDownTab = _props.onKeyDownTab,
          onKeyDownArrowDown = _props.onKeyDownArrowDown,
          screenReaderMessage = _props.screenReaderMessage,
          customCloseIcon = _props.customCloseIcon;


      var closeIcon = customCloseIcon || (0, _inferno.createComponentVNode)(2, _close2.default);
      var screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;

      return (0, _inferno.createVNode)(1, 'div', 'SingleDatePickerInput', [(0, _inferno.createComponentVNode)(2, _DateInput2.default, {
        'id': id,
        'placeholder': placeholder,
        'displayValue': displayValue,
        'inputValue': inputValue,
        'screenReaderMessage': screenReaderText,
        'focused': focused,
        'isFocused': isFocused,
        'disabled': disabled,
        'required': required,
        'showCaret': showCaret,
        'onChange': onChange,
        'onFocus': onFocus,
        'onKeyDownShiftTab': onKeyDownShiftTab,
        'onKeyDownTab': onKeyDownTab,
        'onKeyDownArrowDown': onKeyDownArrowDown
      }), showClearDate && (0, _inferno.createVNode)(1, 'button', (0, _classnames2.default)('SingleDatePickerInput__clear-date', {
        'SingleDatePickerInput__clear-date--hide': !displayValue,
        'SingleDatePickerInput__clear-date--hover': isClearDateHovered
      }), (0, _inferno.createVNode)(1, 'div', 'DateRangePickerInput__close', closeIcon, 0), 2, {
        'type': 'button',
        'aria-label': phrases.clearDate,
        'onMouseEnter': this.onClearDateMouseEnter,
        'onMouseLeave': this.onClearDateMouseLeave,
        'onClick': onClearDate
      })], 0);
    }
  }]);

  return SingleDatePickerInput;
}(_inferno.Component);

exports.default = SingleDatePickerInput;


SingleDatePickerInput.propTypes = propTypes;
SingleDatePickerInput.defaultProps = defaultProps;