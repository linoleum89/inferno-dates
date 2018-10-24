'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BOTTOM_RIGHT = exports.TOP_RIGHT = exports.TOP_LEFT = undefined;
exports.KeyboardShortcutRow = KeyboardShortcutRow;
exports.default = DayPickerKeyboardShortcuts;

var _inferno = require('inferno');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _airbnbPropTypesInferno = require('../airbnb-prop-types-inferno');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _close = require('../svg/close');

var _close2 = _interopRequireDefault(_close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOP_LEFT = exports.TOP_LEFT = 'top-left';
var TOP_RIGHT = exports.TOP_RIGHT = 'top-right';
var BOTTOM_RIGHT = exports.BOTTOM_RIGHT = 'bottom-right';

var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)({
  block: _propTypes2.default.bool,
  buttonLocation: _propTypes2.default.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT]),
  showKeyboardShortcutsPanel: _propTypes2.default.bool,
  openKeyboardShortcutsPanel: _propTypes2.default.func,
  closeKeyboardShortcutsPanel: _propTypes2.default.func,
  phrases: _propTypes2.default.shape((0, _getPhrasePropTypes2.default)(_defaultPhrases.DayPickerKeyboardShortcutsPhrases))
});

var defaultProps = {
  block: false,
  buttonLocation: BOTTOM_RIGHT,
  showKeyboardShortcutsPanel: false,
  openKeyboardShortcutsPanel: function openKeyboardShortcutsPanel() {},
  closeKeyboardShortcutsPanel: function closeKeyboardShortcutsPanel() {},

  phrases: _defaultPhrases.DayPickerKeyboardShortcutsPhrases
};

function KeyboardShortcutRow(_ref) {
  var unicode = _ref.unicode,
      label = _ref.label,
      action = _ref.action;

  return (0, _inferno.createVNode)(1, 'li', 'KeyboardShortcutRow', [(0, _inferno.createVNode)(1, 'div', 'KeyboardShortcutRow__key-container', (0, _inferno.createVNode)(1, 'span', 'KeyboardShortcutRow__key', unicode, 0, {
    'role': 'img',
    'aria-label': label
  }), 2), (0, _inferno.createVNode)(1, 'div', 'KeyboardShortcutRow__action', action, 0)], 4);
}

KeyboardShortcutRow.propTypes = {
  unicode: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired,
  action: _propTypes2.default.string.isRequired
};

function DayPickerKeyboardShortcuts(_ref2) {
  var block = _ref2.block,
      buttonLocation = _ref2.buttonLocation,
      showKeyboardShortcutsPanel = _ref2.showKeyboardShortcutsPanel,
      openKeyboardShortcutsPanel = _ref2.openKeyboardShortcutsPanel,
      closeKeyboardShortcutsPanel = _ref2.closeKeyboardShortcutsPanel,
      phrases = _ref2.phrases;

  var keyboardShortcuts = [{
    unicode: '↵',
    label: phrases.enterKey,
    action: phrases.selectFocusedDate
  }, {
    unicode: '←/→',
    label: phrases.leftArrowRightArrow,
    action: phrases.moveFocusByOneDay
  }, {
    unicode: '↑/↓',
    label: phrases.upArrowDownArrow,
    action: phrases.moveFocusByOneWeek
  }, {
    unicode: 'PgUp/PgDn',
    label: phrases.pageUpPageDown,
    action: phrases.moveFocusByOneMonth
  }, {
    unicode: 'Home/End',
    label: phrases.homeEnd,
    action: phrases.moveFocustoStartAndEndOfWeek
  }, {
    unicode: 'Esc',
    label: phrases.escape,
    action: phrases.returnFocusToInput
  }, {
    unicode: '?',
    label: phrases.questionMark,
    action: phrases.openThisPanel
  }];

  var toggleButtonText = showKeyboardShortcutsPanel ? phrases.hideKeyboardShortcutsPanel : phrases.showKeyboardShortcutsPanel;

  // kurdin's fix
  var on = {};
  // \ kurdin's fix

  return (0, _inferno.createVNode)(1, 'div', null, [(0, _inferno.createVNode)(1, 'button', (0, _classnames2.default)('DayPickerKeyboardShortcuts__show', {
    'DayPickerKeyboardShortcuts__show--bottom-right': buttonLocation === BOTTOM_RIGHT,
    'DayPickerKeyboardShortcuts__show--top-right': buttonLocation === TOP_RIGHT,
    'DayPickerKeyboardShortcuts__show--top-left': buttonLocation === TOP_LEFT
  }), (0, _inferno.createVNode)(1, 'span', 'DayPickerKeyboardShortcuts__show_span', (0, _inferno.createTextVNode)('?'), 2), 2, {
    'type': 'button',
    'aria-label': toggleButtonText,
    'onClick': function onClick() {
      // we want to return focus to this button after closing the keyboard shortcuts panel
      openKeyboardShortcutsPanel(function () {
        on.showKeyboardShortcutsButton.focus();
      });
    },
    'onMouseUp': function onMouseUp(e) {
      e.currentTarget.blur();
    }
  }, null, function (ref) {
    on.showKeyboardShortcutsButton = ref;
  }), showKeyboardShortcutsPanel && (0, _inferno.createVNode)(1, 'div', (0, _classnames2.default)('DayPickerKeyboardShortcuts__panel', {
    'DayPickerKeyboardShortcuts__panel--block': block
  }), [(0, _inferno.createVNode)(1, 'div', 'DayPickerKeyboardShortcuts__title', phrases.keyboardShortcuts, 0, {
    'id': 'DayPickerKeyboardShortcuts__title'
  }), (0, _inferno.createVNode)(1, 'button', 'DayPickerKeyboardShortcuts__close', (0, _inferno.createComponentVNode)(2, _close2.default), 2, {
    'type': 'button',
    'aria-label': phrases.hideKeyboardShortcutsPanel,
    'onClick': closeKeyboardShortcutsPanel,
    'onKeyDown': function onKeyDown(e) {
      // Because the close button is the only focusable element inside of the panel, this
      // amount to a very basic focus trap. The user can exit the panel by "pressing" the
      // close button or hitting escape
      if (e.key === 'Tab') {
        e.preventDefault();
      }
    }
  }), (0, _inferno.createVNode)(1, 'ul', 'DayPickerKeyboardShortcuts__list', keyboardShortcuts.map(function (_ref3) {
    var unicode = _ref3.unicode,
        label = _ref3.label,
        action = _ref3.action;
    return (0, _inferno.createComponentVNode)(2, KeyboardShortcutRow, {
      'unicode': unicode,
      'label': label,
      'action': action
    }, label);
  }), 0)], 4, {
    'role': 'dialog',
    'aria-labelledby': 'DayPickerKeyboardShortcuts__title'
  })], 0);
}

DayPickerKeyboardShortcuts.propTypes = propTypes;
DayPickerKeyboardShortcuts.defaultProps = defaultProps;