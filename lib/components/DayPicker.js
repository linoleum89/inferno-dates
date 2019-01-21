'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defaultProps = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.calculateDimension = calculateDimension;

var _inferno = require('inferno');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _airbnbPropTypesInferno = require('../airbnb-prop-types-inferno');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _findDOMNode = require('../utils/findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _OutsideClickHandler = require('./OutsideClickHandler');

var _OutsideClickHandler2 = _interopRequireDefault(_OutsideClickHandler);

var _CalendarMonthGrid = require('./CalendarMonthGrid');

var _CalendarMonthGrid2 = _interopRequireDefault(_CalendarMonthGrid);

var _DayPickerNavigation = require('./DayPickerNavigation');

var _DayPickerNavigation2 = _interopRequireDefault(_DayPickerNavigation);

var _DayPickerKeyboardShortcuts = require('./DayPickerKeyboardShortcuts');

var _DayPickerKeyboardShortcuts2 = _interopRequireDefault(_DayPickerKeyboardShortcuts);

var _getTransformStyles = require('../utils/getTransformStyles');

var _getTransformStyles2 = _interopRequireDefault(_getTransformStyles);

var _getCalendarMonthWidth = require('../utils/getCalendarMonthWidth');

var _getCalendarMonthWidth2 = _interopRequireDefault(_getCalendarMonthWidth);

var _isTouchDevice = require('../utils/isTouchDevice');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

var _getActiveElement = require('../utils/getActiveElement');

var _getActiveElement2 = _interopRequireDefault(_getActiveElement);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MONTH_PADDING = 23;
var DAY_PICKER_PADDING = 9;
var PREV_TRANSITION = 'prev';
var NEXT_TRANSITION = 'next';

var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)({
	// calendar presentation props
	enableOutsideDays: _propTypes2.default.bool,
	numberOfMonths: _propTypes2.default.number,
	orientation: _ScrollableOrientationShape2.default,
	withPortal: _propTypes2.default.bool,
	onOutsideClick: _propTypes2.default.func,
	hidden: _propTypes2.default.bool,
	initialVisibleMonth: _propTypes2.default.func,
	renderCalendarInfo: _propTypes2.default.func,
	daySize: _propTypes2.default.number,

	// navigation props
	navPrev: _propTypes2.default.node,
	navNext: _propTypes2.default.node,
	onPrevMonthClick: _propTypes2.default.func,
	onNextMonthClick: _propTypes2.default.func,

	// day props
	modifiers: _propTypes2.default.object,
	renderDay: _propTypes2.default.func,
	onDayClick: _propTypes2.default.func,
	onDayMouseEnter: _propTypes2.default.func,
	onDayMouseLeave: _propTypes2.default.func,

	// accessibility props
	isFocused: _propTypes2.default.bool,
	getFirstFocusableDay: _propTypes2.default.func,
	onBlur: _propTypes2.default.func,
	showKeyboardShortcuts: _propTypes2.default.bool,

	// internationalization
	monthFormat: _propTypes2.default.string,
	phrases: _propTypes2.default.shape((0, _getPhrasePropTypes2.default)(_defaultPhrases.DayPickerPhrases))
});

var defaultProps = exports.defaultProps = {
	// calendar presentation props
	enableOutsideDays: false,
	numberOfMonths: 2,
	orientation: _constants.HORIZONTAL_ORIENTATION,
	withPortal: false,
	onOutsideClick: function onOutsideClick() {},

	hidden: false,
	initialVisibleMonth: function initialVisibleMonth() {
		return (0, _moment2.default)();
	},
	renderCalendarInfo: null,
	daySize: _constants.DAY_SIZE,

	// navigation props
	navPrev: null,
	navNext: null,
	onPrevMonthClick: function onPrevMonthClick() {},
	onNextMonthClick: function onNextMonthClick() {},


	// day props
	modifiers: {},
	renderDay: null,
	onDayClick: function onDayClick() {},
	onDayMouseEnter: function onDayMouseEnter() {},
	onDayMouseLeave: function onDayMouseLeave() {},


	// accessibility props
	isFocused: false,
	getFirstFocusableDay: null,
	onBlur: function onBlur() {},

	showKeyboardShortcuts: false,

	// internationalization
	monthFormat: 'MMMM YYYY',
	phrases: _defaultPhrases.DayPickerPhrases
};

function applyTransformStyles(el, transform) {
	var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	var transformStyles = (0, _getTransformStyles2.default)(transform);
	transformStyles.opacity = opacity;

	Object.keys(transformStyles).forEach(function (styleKey) {
		// eslint-disable-next-line no-param-reassign
		el.style[styleKey] = transformStyles[styleKey];
	});
}

function calculateDimension(el, axis) {
	var borderBox = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	var withMargin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	if (!el) {
		return 0;
	}

	var axisStart = axis === 'width' ? 'Left' : 'Top';
	var axisEnd = axis === 'width' ? 'Right' : 'Bottom';

	// Only read styles if we need to
	var style = !borderBox || withMargin ? window.getComputedStyle(el) : null;

	// Offset includes border and padding
	var offsetWidth = el.offsetWidth,
	    offsetHeight = el.offsetHeight;

	var size = axis === 'width' ? offsetWidth : offsetHeight;

	// Get the inner size
	if (!borderBox) {
		size -= parseFloat(style['padding' + axisStart]) + parseFloat(style['padding' + axisEnd]) + parseFloat(style['border' + axisStart + 'Width']) + parseFloat(style['border' + axisEnd + 'Width']);
	}

	// Apply margin
	if (withMargin) {
		size += parseFloat(style['margin' + axisStart]) + parseFloat(style['margin' + axisEnd]);
	}

	return size;
}

function getMonthHeight(el) {
	var caption = el.querySelector('.js-CalendarMonth__caption');
	var grid = el.querySelector('.js-CalendarMonth__grid');

	// Need to separate out table children for FF
	// Add an additional +1 for the border
	return calculateDimension(caption, 'height', true, true) + calculateDimension(grid, 'height') + 1;
}

var DayPicker = function (_Component) {
	_inherits(DayPicker, _Component);

	function DayPicker(props) {
		_classCallCheck(this, DayPicker);

		var _this = _possibleConstructorReturn(this, (DayPicker.__proto__ || Object.getPrototypeOf(DayPicker)).call(this, props));

		var currentMonth = props.hidden ? (0, _moment2.default)() : props.initialVisibleMonth();

		var focusedDate = currentMonth.clone().startOf('month');
		if (props.getFirstFocusableDay) {
			focusedDate = props.getFirstFocusableDay(currentMonth);
		}

		_this.hasSetInitialVisibleMonth = !props.hidden;
		_this.state = {
			currentMonth: currentMonth,
			monthTransition: null,
			translationValue: 0,
			scrollableMonthMultiple: 1,
			calendarMonthWidth: (0, _getCalendarMonthWidth2.default)(props.daySize),
			focusedDate: !props.hidden || props.isFocused ? focusedDate : null,
			nextFocusedDate: null,
			showKeyboardShortcuts: props.showKeyboardShortcuts,
			onKeyboardShortcutsPanelClose: function onKeyboardShortcutsPanelClose() {},

			isTouchDevice: (0, _isTouchDevice2.default)(),
			withMouseInteractions: true
		};

		_this.onKeyDown = _this.onKeyDown.bind(_this);
		_this.onPrevMonthClick = _this.onPrevMonthClick.bind(_this);
		_this.onNextMonthClick = _this.onNextMonthClick.bind(_this);
		_this.multiplyScrollableMonths = _this.multiplyScrollableMonths.bind(_this);
		_this.updateStateAfterMonthTransition = _this.updateStateAfterMonthTransition.bind(_this);

		_this.openKeyboardShortcutsPanel = _this.openKeyboardShortcutsPanel.bind(_this);
		_this.closeKeyboardShortcutsPanel = _this.closeKeyboardShortcutsPanel.bind(_this);
		return _this;
	}

	_createClass(DayPicker, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({ isTouchDevice: (0, _isTouchDevice2.default)() });

			if (this.isHorizontal()) {
				this.adjustDayPickerHeight();
				this.initializeDayPickerWidth();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var hidden = nextProps.hidden,
			    isFocused = nextProps.isFocused,
			    showKeyboardShortcuts = nextProps.showKeyboardShortcuts,
			    onBlur = nextProps.onBlur;
			var currentMonth = this.state.currentMonth;


			if (!hidden) {
				if (!this.hasSetInitialVisibleMonth) {
					this.hasSetInitialVisibleMonth = true;
					this.setState({
						currentMonth: nextProps.initialVisibleMonth()
					});
				}

				if (!this.dayPickerWidth && this.isHorizontal()) {
					this.initializeDayPickerWidth();
					this.adjustDayPickerHeight();
				}
			}

			if (nextProps.daySize !== this.props.daySize) {
				this.setState({
					calendarMonthWidth: (0, _getCalendarMonthWidth2.default)(nextProps.daySize)
				});
			}

			if (isFocused !== this.props.isFocused) {
				if (isFocused) {
					var focusedDate = this.getFocusedDay(currentMonth);

					var onKeyboardShortcutsPanelClose = this.state.onKeyboardShortcutsPanelClose;
					if (nextProps.showKeyboardShortcuts) {
						// the ? shortcut came from the input and we should return input there once it is close
						onKeyboardShortcutsPanelClose = onBlur;
					}

					this.setState({
						showKeyboardShortcuts: showKeyboardShortcuts,
						onKeyboardShortcutsPanelClose: onKeyboardShortcutsPanelClose,
						focusedDate: focusedDate,
						withMouseInteractions: false
					});
				} else {
					this.setState({ focusedDate: null });
				}
			}
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			var _state = this.state,
			    monthTransition = _state.monthTransition,
			    currentMonth = _state.currentMonth,
			    focusedDate = _state.focusedDate;

			if (monthTransition || !currentMonth.isSame(prevState.currentMonth)) {
				if (this.isHorizontal()) {
					this.adjustDayPickerHeight();
				}
			}

			if (!prevProps.isFocused && this.props.isFocused && !focusedDate || !prevProps.showKeyboardShortcuts && this.props.showKeyboardShortcuts) {
				this.container.focus();
			}
		}
	}, {
		key: 'onKeyDown',
		value: function onKeyDown(e) {
			e.stopPropagation();

			this.setState({ withMouseInteractions: false });

			var onBlur = this.props.onBlur;
			var _state2 = this.state,
			    focusedDate = _state2.focusedDate,
			    showKeyboardShortcuts = _state2.showKeyboardShortcuts;

			if (!focusedDate) return;

			var newFocusedDate = focusedDate.clone();

			var didTransitionMonth = false;

			// focus might be anywhere when the keyboard shortcuts panel is opened so we want to
			// return it to wherever it was before when the panel was opened
			var activeElement = (0, _getActiveElement2.default)();
			var onKeyboardShortcutsPanelClose = function onKeyboardShortcutsPanelClose() {
				if (activeElement) activeElement.focus();
			};

			switch (e.key) {
				case 'ArrowUp':
					e.preventDefault();
					newFocusedDate.subtract(1, 'week');
					didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
					break;
				case 'ArrowLeft':
					e.preventDefault();
					newFocusedDate.subtract(1, 'day');
					didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
					break;
				case 'Home':
					e.preventDefault();
					newFocusedDate.startOf('week');
					didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
					break;
				case 'PageUp':
					e.preventDefault();
					newFocusedDate.subtract(1, 'month');
					didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
					break;

				case 'ArrowDown':
					e.preventDefault();
					newFocusedDate.add(1, 'week');
					didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
					break;
				case 'ArrowRight':
					e.preventDefault();
					newFocusedDate.add(1, 'day');
					didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
					break;
				case 'End':
					e.preventDefault();
					newFocusedDate.endOf('week');
					didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
					break;
				case 'PageDown':
					e.preventDefault();
					newFocusedDate.add(1, 'month');
					didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
					break;

				case '?':
					this.openKeyboardShortcutsPanel(onKeyboardShortcutsPanelClose);
					break;

				case 'Escape':
					if (showKeyboardShortcuts) {
						this.closeKeyboardShortcutsPanel();
					} else {
						onBlur();
					}
					break;

				default:
					break;
			}

			// If there was a month transition, do not update the focused date until the transition has
			// completed. Otherwise, attempting to focus on a DOM node may interrupt the CSS animation. If
			// didTransitionMonth is true, the focusedDate gets updated in #updateStateAfterMonthTransition
			if (!didTransitionMonth) {
				this.setState({
					focusedDate: newFocusedDate
				});
			}
		}
	}, {
		key: 'onPrevMonthClick',
		value: function onPrevMonthClick(nextFocusedDate, e) {
			if (e) e.preventDefault();

			if (this.props.onPrevMonthClick) {
				this.props.onPrevMonthClick(e);
			}

			var translationValue = this.isVertical() ? this.getMonthHeightByIndex(0) : this.dayPickerWidth;

			// The first CalendarMonth is always positioned absolute at top: 0 or left: 0
			// so we need to transform it to the appropriate location before the animation.
			// This behavior is because we would otherwise need a double-render in order to
			// adjust the container position once we had the height the first calendar
			// (ie first draw all the calendar, then in a second render, use the first calendar's
			// height to position the container). Variable calendar heights, amirite? <3 Maja
			this.translateFirstDayPickerForAnimation(translationValue);

			this.setState({
				monthTransition: PREV_TRANSITION,
				translationValue: translationValue,
				nextFocusedDate: nextFocusedDate
			});
		}
	}, {
		key: 'onNextMonthClick',
		value: function onNextMonthClick(nextFocusedDate, e) {
			if (e) e.preventDefault();
			if (this.props.onNextMonthClick) {
				this.props.onNextMonthClick(e);
			}

			var translationValue = this.isVertical() ? -this.getMonthHeightByIndex(1) : -this.dayPickerWidth;

			this.setState({
				monthTransition: NEXT_TRANSITION,
				translationValue: translationValue,
				nextFocusedDate: nextFocusedDate
			});
		}
	}, {
		key: 'getFocusedDay',
		value: function getFocusedDay(newMonth) {
			var getFirstFocusableDay = this.props.getFirstFocusableDay;


			var focusedDate = void 0;
			if (getFirstFocusableDay) {
				focusedDate = getFirstFocusableDay(newMonth);
			}

			if (newMonth && (!focusedDate || !this.isDayVisible(focusedDate, newMonth))) {
				focusedDate = newMonth.clone().startOf('month');
			}

			return focusedDate;
		}
	}, {
		key: 'getMonthHeightByIndex',
		value: function getMonthHeightByIndex(i) {
			return getMonthHeight(this.transitionContainer.querySelectorAll('.CalendarMonth')[i]);
		}
	}, {
		key: 'maybeTransitionNextMonth',
		value: function maybeTransitionNextMonth(newFocusedDate) {
			var focusedDate = this.state.focusedDate;


			var newFocusedDateMonth = newFocusedDate.month();
			var focusedDateMonth = focusedDate.month();
			if (newFocusedDateMonth !== focusedDateMonth && !this.isDayVisible(newFocusedDate)) {
				this.onNextMonthClick(newFocusedDate);
				return true;
			}

			return false;
		}
	}, {
		key: 'maybeTransitionPrevMonth',
		value: function maybeTransitionPrevMonth(newFocusedDate) {
			var focusedDate = this.state.focusedDate;


			var newFocusedDateMonth = newFocusedDate.month();
			var focusedDateMonth = focusedDate.month();
			if (newFocusedDateMonth !== focusedDateMonth && !this.isDayVisible(newFocusedDate)) {
				this.onPrevMonthClick(newFocusedDate);
				return true;
			}

			return false;
		}
	}, {
		key: 'multiplyScrollableMonths',
		value: function multiplyScrollableMonths(e) {
			if (e) e.preventDefault();

			this.setState({
				scrollableMonthMultiple: this.state.scrollableMonthMultiple + 1
			});
		}
	}, {
		key: 'isDayVisible',
		value: function isDayVisible(day, newMonth) {
			var numberOfMonths = this.props.numberOfMonths;
			var currentMonth = this.state.currentMonth;


			var month = newMonth || currentMonth;
			var firstDayOfFirstMonth = month.clone().startOf('month');
			var lastDayOfLastMonth = month.clone().add(numberOfMonths - 1, 'months').endOf('month');

			return !day.isBefore(firstDayOfFirstMonth) && !day.isAfter(lastDayOfLastMonth);
		}
	}, {
		key: 'isHorizontal',
		value: function isHorizontal() {
			return this.props.orientation === _constants.HORIZONTAL_ORIENTATION;
		}
	}, {
		key: 'isVertical',
		value: function isVertical() {
			return this.props.orientation === _constants.VERTICAL_ORIENTATION || this.props.orientation === _constants.VERTICAL_SCROLLABLE;
		}
	}, {
		key: 'initializeDayPickerWidth',
		value: function initializeDayPickerWidth() {
			this.dayPickerWidth = calculateDimension(
			// eslint-disable-next-line react/no-find-dom-node
			(0, _findDOMNode2.default)(this.calendarMonthGrid).querySelector('.CalendarMonth'), 'width', true);
		}
	}, {
		key: 'updateStateAfterMonthTransition',
		value: function updateStateAfterMonthTransition() {
			var _this2 = this;

			var _state3 = this.state,
			    currentMonth = _state3.currentMonth,
			    monthTransition = _state3.monthTransition,
			    focusedDate = _state3.focusedDate,
			    nextFocusedDate = _state3.nextFocusedDate;


			if (!monthTransition) return;

			var newMonth = currentMonth.clone();
			if (monthTransition === PREV_TRANSITION) {
				newMonth.subtract(1, 'month');
			} else if (monthTransition === NEXT_TRANSITION) {
				newMonth.add(1, 'month');
			}

			var newFocusedDate = null;
			if (nextFocusedDate) {
				newFocusedDate = nextFocusedDate;
			} else if (focusedDate) {
				newFocusedDate = this.getFocusedDay(newMonth);
			}

			// clear the previous transforms
			applyTransformStyles(
			// eslint-disable-next-line react/no-find-dom-node
			(0, _findDOMNode2.default)(this.calendarMonthGrid).querySelector('.CalendarMonth'), 'none');

			this.setState({
				currentMonth: newMonth,
				monthTransition: null,
				translationValue: 0,
				nextFocusedDate: null,
				focusedDate: newFocusedDate
			}, function () {
				// we don't want to focus on the relevant calendar day after a month transition
				// if the user is navigating around using a mouse
				if (_this2.state.withMouseInteractions) {
					var activeElement = (0, _getActiveElement2.default)();
					if (activeElement && activeElement !== document.body) {
						activeElement.blur();
					}
				}
			});
		}
	}, {
		key: 'adjustDayPickerHeight',
		value: function adjustDayPickerHeight() {
			var heights = [];

			Array.prototype.forEach.call(this.transitionContainer.querySelectorAll('.CalendarMonth'), function (el) {
				if (el.getAttribute('data-visible') === 'true') {
					heights.push(getMonthHeight(el));
				}
			});

			var newMonthHeight = Math.max.apply(Math, heights) + MONTH_PADDING;

			if (newMonthHeight !== calculateDimension(this.transitionContainer, 'height')) {
				this.monthHeight = newMonthHeight;
				this.transitionContainer.style.height = newMonthHeight + 'px';
			}
		}
	}, {
		key: 'translateFirstDayPickerForAnimation',
		value: function translateFirstDayPickerForAnimation(translationValue) {
			var transformType = this.isVertical() ? 'translateY' : 'translateX';
			var transformValue = transformType + '(-' + translationValue + 'px)';

			applyTransformStyles(this.transitionContainer.querySelector('.CalendarMonth'), transformValue, 1);
		}
	}, {
		key: 'openKeyboardShortcutsPanel',
		value: function openKeyboardShortcutsPanel(onCloseCallBack) {
			this.setState({
				showKeyboardShortcuts: true,
				onKeyboardShortcutsPanelClose: onCloseCallBack
			});
		}
	}, {
		key: 'closeKeyboardShortcutsPanel',
		value: function closeKeyboardShortcutsPanel() {
			var onKeyboardShortcutsPanelClose = this.state.onKeyboardShortcutsPanelClose;


			if (onKeyboardShortcutsPanelClose) {
				onKeyboardShortcutsPanelClose();
			}

			this.setState({
				onKeyboardShortcutsPanelClose: null,
				showKeyboardShortcuts: false
			});
		}
	}, {
		key: 'renderNavigation',
		value: function renderNavigation() {
			var _this3 = this;

			var _props = this.props,
			    navPrev = _props.navPrev,
			    navNext = _props.navNext,
			    orientation = _props.orientation,
			    phrases = _props.phrases;


			var onNextMonthClick = void 0;
			if (orientation === _constants.VERTICAL_SCROLLABLE) {
				onNextMonthClick = this.multiplyScrollableMonths;
			} else {
				onNextMonthClick = function onNextMonthClick(e) {
					_this3.onNextMonthClick(null, e);
				};
			}

			return (0, _inferno.createComponentVNode)(2, _DayPickerNavigation2.default, {
				'onPrevMonthClick': function onPrevMonthClick(e) {
					_this3.onPrevMonthClick(null, e);
				},
				'onNextMonthClick': onNextMonthClick,
				'navPrev': navPrev,
				'navNext': navNext,
				'orientation': orientation,
				'phrases': phrases
			});
		}
	}, {
		key: 'renderWeekHeader',
		value: function renderWeekHeader(index) {
			var _props2 = this.props,
			    daySize = _props2.daySize,
			    orientation = _props2.orientation;
			var calendarMonthWidth = this.state.calendarMonthWidth;


			var verticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;

			var horizontalStyle = {
				left: index * calendarMonthWidth + 'px'
			};

			var verticalStyle = {
				marginLeft: -calendarMonthWidth / 2 + 'px'
			};

			var style = {}; // no styles applied to the vertical-scrollable orientation
			if (this.isHorizontal()) {
				style = horizontalStyle;
			} else if (this.isVertical() && !verticalScrollable) {
				style = verticalStyle;
			}

			var header = [];
			for (var i = 0; i < 7; i += 1) {
				header.push((0, _inferno.createVNode)(1, 'li', null, (0, _inferno.createVNode)(1, 'small', null, (0, _moment2.default)().weekday(i).format('dd'), 0), 2, {
					'style': { width: daySize + 'px' }
				}, i));
			}

			return (0, _inferno.createVNode)(1, 'div', 'DayPicker__week-header', (0, _inferno.createVNode)(1, 'ul', null, header, 0), 2, {
				'style': style
			}, 'week-' + index);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _state4 = this.state,
			    calendarMonthWidth = _state4.calendarMonthWidth,
			    currentMonth = _state4.currentMonth,
			    monthTransition = _state4.monthTransition,
			    translationValue = _state4.translationValue,
			    scrollableMonthMultiple = _state4.scrollableMonthMultiple,
			    focusedDate = _state4.focusedDate,
			    showKeyboardShortcuts = _state4.showKeyboardShortcuts,
			    isTouch = _state4.isTouchDevice;
			var _props3 = this.props,
			    enableOutsideDays = _props3.enableOutsideDays,
			    numberOfMonths = _props3.numberOfMonths,
			    orientation = _props3.orientation,
			    modifiers = _props3.modifiers,
			    withPortal = _props3.withPortal,
			    onDayClick = _props3.onDayClick,
			    onDayMouseEnter = _props3.onDayMouseEnter,
			    onDayMouseLeave = _props3.onDayMouseLeave,
			    renderDay = _props3.renderDay,
			    renderCalendarInfo = _props3.renderCalendarInfo,
			    onOutsideClick = _props3.onOutsideClick,
			    monthFormat = _props3.monthFormat,
			    daySize = _props3.daySize,
			    isFocused = _props3.isFocused,
			    phrases = _props3.phrases;


			var numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
			var weekHeaders = [];
			for (var i = 0; i < numOfWeekHeaders; i += 1) {
				weekHeaders.push(this.renderWeekHeader(i));
			}

			var firstVisibleMonthIndex = 1;
			if (monthTransition === PREV_TRANSITION) {
				firstVisibleMonthIndex -= 1;
			} else if (monthTransition === NEXT_TRANSITION) {
				firstVisibleMonthIndex += 1;
			}

			var verticalScrollable = this.props.orientation === _constants.VERTICAL_SCROLLABLE;

			var dayPickerClassNames = (0, _classnames2.default)('DayPicker', {
				'DayPicker--horizontal': this.isHorizontal(),
				'DayPicker--vertical': this.isVertical(),
				'DayPicker--vertical-scrollable': verticalScrollable,
				'DayPicker--portal': withPortal
			});

			var transitionContainerClasses = (0, _classnames2.default)('transition-container', {
				'transition-container--horizontal': this.isHorizontal(),
				'transition-container--vertical': this.isVertical()
			});

			var horizontalWidth = calendarMonthWidth * numberOfMonths + 2 * DAY_PICKER_PADDING;

			// this is a kind of made-up value that generally looks good. we'll
			// probably want to let the user set this explicitly.
			var verticalHeight = 1.75 * calendarMonthWidth;

			var dayPickerStyle = {
				width: this.isHorizontal() && horizontalWidth + 'px',

				// These values are to center the datepicker (approximately) on the page
				marginLeft: this.isHorizontal() && withPortal && -horizontalWidth / 2 + 'px',
				marginTop: this.isHorizontal() && withPortal && -calendarMonthWidth / 2 + 'px'
			};

			var transitionContainerStyle = {
				width: this.isHorizontal() && horizontalWidth + 'px',
				height: this.isVertical() && !verticalScrollable && !withPortal && verticalHeight + 'px'
			};

			var isCalendarMonthGridAnimating = monthTransition !== null;
			var transformType = this.isVertical() ? 'translateY' : 'translateX';
			var transformValue = transformType + '(' + translationValue + 'px)';

			var shouldFocusDate = !isCalendarMonthGridAnimating && isFocused;

			var keyboardShortcutButtonLocation = _DayPickerKeyboardShortcuts.BOTTOM_RIGHT;
			if (this.isVertical()) {
				keyboardShortcutButtonLocation = withPortal ? _DayPickerKeyboardShortcuts.TOP_LEFT : _DayPickerKeyboardShortcuts.TOP_RIGHT;
			}

			return (0, _inferno.createVNode)(1, 'div', dayPickerClassNames, (0, _inferno.createComponentVNode)(2, _OutsideClickHandler2.default, {
				'onOutsideClick': onOutsideClick,
				children: [(0, _inferno.createVNode)(1, 'div', 'DayPicker__week-headers', weekHeaders, 0, {
					'aria-hidden': 'true',
					'role': 'presentation'
				}), (0, _inferno.createVNode)(1, 'div', 'DayPicker__focus-region', [!verticalScrollable && this.renderNavigation(), (0, _inferno.createVNode)(1, 'div', transitionContainerClasses, [(0, _inferno.createComponentVNode)(2, _CalendarMonthGrid2.default, {
					'transformValue': transformValue,
					'enableOutsideDays': enableOutsideDays,
					'firstVisibleMonthIndex': firstVisibleMonthIndex,
					'initialMonth': currentMonth,
					'isAnimating': isCalendarMonthGridAnimating,
					'modifiers': modifiers,
					'orientation': orientation,
					'numberOfMonths': numberOfMonths * scrollableMonthMultiple,
					'onDayClick': onDayClick,
					'onDayMouseEnter': onDayMouseEnter,
					'onDayMouseLeave': onDayMouseLeave,
					'renderDay': renderDay,
					'onMonthTransitionEnd': this.updateStateAfterMonthTransition,
					'monthFormat': monthFormat,
					'daySize': daySize,
					'isFocused': shouldFocusDate,
					'focusedDate': focusedDate,
					'phrases': phrases
				}, null, function (ref) {
					_this4.calendarMonthGrid = ref;
				}), verticalScrollable && this.renderNavigation()], 0, {
					'style': transitionContainerStyle
				}, null, function (ref) {
					_this4.transitionContainer = ref;
				}), !isTouch && (0, _inferno.createComponentVNode)(2, _DayPickerKeyboardShortcuts2.default, {
					'block': this.isVertical() && !withPortal,
					'buttonLocation': keyboardShortcutButtonLocation,
					'showKeyboardShortcutsPanel': showKeyboardShortcuts,
					'openKeyboardShortcutsPanel': this.openKeyboardShortcutsPanel,
					'closeKeyboardShortcutsPanel': this.closeKeyboardShortcutsPanel,
					'phrases': phrases
				})], 0, {
					'onClick': function onClick(e) {
						e.stopPropagation();
					},
					'onKeyDown': (0, _lodash2.default)(this.onKeyDown, 300),
					'onMouseUp': function onMouseUp() {
						_this4.setState({ withMouseInteractions: true });
					},
					'role': 'region',
					'tabIndex': -1
				}, null, function (ref) {
					_this4.container = ref;
				}), renderCalendarInfo && renderCalendarInfo()]
			}), 2, {
				'style': dayPickerStyle
			});
		}
	}]);

	return DayPicker;
}(_inferno.Component);

exports.default = DayPicker;


DayPicker.propTypes = propTypes;
DayPicker.defaultProps = defaultProps;