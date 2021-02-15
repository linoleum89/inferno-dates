'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _consolidatedEvents = require('consolidated-events');

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _CalendarMonth = require('./CalendarMonth');

var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

var _isTransitionEndSupported = require('../utils/isTransitionEndSupported');

var _isTransitionEndSupported2 = _interopRequireDefault(_isTransitionEndSupported);

var _getTransformStyles = require('../utils/getTransformStyles');

var _getTransformStyles2 = _interopRequireDefault(_getTransformStyles);

var _getCalendarMonthWidth = require('../utils/getCalendarMonthWidth');

var _getCalendarMonthWidth2 = _interopRequireDefault(_getCalendarMonthWidth);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)({
	enableOutsideDays: _propTypes2.default.bool,
	firstVisibleMonthIndex: _propTypes2.default.number,
	initialMonth: _momentProptypesInferno2.default.momentObj,
	isAnimating: _propTypes2.default.bool,
	numberOfMonths: _propTypes2.default.number,
	modifiers: _propTypes2.default.object,
	orientation: _ScrollableOrientationShape2.default,
	onDayClick: _propTypes2.default.func,
	onDayMouseEnter: _propTypes2.default.func,
	onDayMouseLeave: _propTypes2.default.func,
	onMonthTransitionEnd: _propTypes2.default.func,
	renderDay: _propTypes2.default.func,
	transformValue: _propTypes2.default.string,
	daySize: _propTypes2.default.number,
	focusedDate: _momentProptypesInferno2.default.momentObj, // indicates focusable day
	isFocused: _propTypes2.default.bool, // indicates whether or not to move focus to focusable day

	// i18n
	monthFormat: _propTypes2.default.string,
	phrases: _propTypes2.default.shape((0, _getPhrasePropTypes2.default)(_defaultPhrases.CalendarDayPhrases))
});

var defaultProps = {
	enableOutsideDays: false,
	firstVisibleMonthIndex: 0,
	initialMonth: (0, _moment2.default)(),
	isAnimating: false,
	numberOfMonths: 1,
	modifiers: {},
	orientation: _constants.HORIZONTAL_ORIENTATION,
	onDayClick: function onDayClick() {},
	onDayMouseEnter: function onDayMouseEnter() {},
	onDayMouseLeave: function onDayMouseLeave() {},
	onMonthTransitionEnd: function onMonthTransitionEnd() {},

	renderDay: null,
	transformValue: 'none',
	daySize: _constants.DAY_SIZE,
	focusedDate: null,
	isFocused: false,

	// i18n
	monthFormat: 'MMMM YYYY', // english locale
	phrases: _defaultPhrases.CalendarDayPhrases
};

function getMonths(initialMonth, numberOfMonths) {
	var month = initialMonth.clone().subtract(1, 'month');

	var months = [];
	for (var i = 0; i < numberOfMonths + 2; i += 1) {
		months.push(month);
		month = month.clone().add(1, 'month');
	}

	return months;
}

var CalendarMonthGrid = function (_Component) {
	_inherits(CalendarMonthGrid, _Component);

	function CalendarMonthGrid(props) {
		_classCallCheck(this, CalendarMonthGrid);

		var _this = _possibleConstructorReturn(this, (CalendarMonthGrid.__proto__ || Object.getPrototypeOf(CalendarMonthGrid)).call(this, props));

		_this.state = {
			months: getMonths(props.initialMonth, props.numberOfMonths)
		};

		_this.isTransitionEndSupported = (0, _isTransitionEndSupported2.default)();
		_this.onTransitionEnd = _this.onTransitionEnd.bind(_this);
		return _this;
	}

	_createClass(CalendarMonthGrid, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.eventHandle = (0, _consolidatedEvents.addEventListener)(this.container, 'transitionend', this.onTransitionEnd);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var initialMonth = nextProps.initialMonth,
			    numberOfMonths = nextProps.numberOfMonths;
			var months = this.state.months;


			var hasMonthChanged = !this.props.initialMonth.isSame(initialMonth, 'month');
			var hasNumberOfMonthsChanged = this.props.numberOfMonths !== numberOfMonths;
			var newMonths = months;

			if (hasMonthChanged && !hasNumberOfMonthsChanged) {
				if (initialMonth.isAfter(this.props.initialMonth)) {
					newMonths = months.slice(1);
					newMonths.push(months[months.length - 1].clone().add(1, 'month'));
				} else {
					newMonths = months.slice(0, months.length - 1);
					newMonths.unshift(months[0].clone().subtract(1, 'month'));
				}
			}

			if (hasNumberOfMonthsChanged) {
				newMonths = getMonths(initialMonth, numberOfMonths);
			}

			this.setState({
				months: newMonths
			});
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _props = this.props,
			    isAnimating = _props.isAnimating,
			    onMonthTransitionEnd = _props.onMonthTransitionEnd;

			// For IE9, immediately call onMonthTransitionEnd instead of
			// waiting for the animation to complete

			if (!this.isTransitionEndSupported && isAnimating) {
				onMonthTransitionEnd();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			(0, _consolidatedEvents.removeEventListener)(this.eventHandle);
		}
	}, {
		key: 'onTransitionEnd',
		value: function onTransitionEnd() {
			this.props.onMonthTransitionEnd();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    enableOutsideDays = _props2.enableOutsideDays,
			    firstVisibleMonthIndex = _props2.firstVisibleMonthIndex,
			    isAnimating = _props2.isAnimating,
			    modifiers = _props2.modifiers,
			    numberOfMonths = _props2.numberOfMonths,
			    monthFormat = _props2.monthFormat,
			    orientation = _props2.orientation,
			    transformValue = _props2.transformValue,
			    daySize = _props2.daySize,
			    onDayMouseEnter = _props2.onDayMouseEnter,
			    onDayMouseLeave = _props2.onDayMouseLeave,
			    onDayClick = _props2.onDayClick,
			    renderDay = _props2.renderDay,
			    onMonthTransitionEnd = _props2.onMonthTransitionEnd,
			    focusedDate = _props2.focusedDate,
			    isFocused = _props2.isFocused,
			    phrases = _props2.phrases;
			var months = this.state.months;

			var isVertical = orientation === _constants.VERTICAL_ORIENTATION;
			var isVerticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
			var isHorizontal = orientation === _constants.HORIZONTAL_ORIENTATION;

			var className = (0, _classnames2.default)('CalendarMonthGrid', {
				'CalendarMonthGrid--horizontal': isHorizontal,
				'CalendarMonthGrid--vertical': isVertical,
				'CalendarMonthGrid--vertical-scrollable': isVerticalScrollable,
				'CalendarMonthGrid--animating': isAnimating
			});

			var calendarMonthWidth = (0, _getCalendarMonthWidth2.default)(daySize);

			var width = isVertical || isVerticalScrollable ? calendarMonthWidth : (numberOfMonths + 2) * calendarMonthWidth;

			var style = _extends({}, (0, _getTransformStyles2.default)(transformValue));

			return (0, _inferno.createVNode)(1, 'div', className, months.map(function (month, i) {
				var isVisible = i >= firstVisibleMonthIndex && i < firstVisibleMonthIndex + numberOfMonths;
				return (0, _inferno.createComponentVNode)(2, _CalendarMonth2.default, {
					'month': month,
					'isVisible': isVisible,
					'enableOutsideDays': enableOutsideDays,
					'modifiers': modifiers,
					'monthFormat': monthFormat,
					'orientation': orientation,
					'onDayMouseEnter': onDayMouseEnter,
					'onDayMouseLeave': onDayMouseLeave,
					'onDayClick': onDayClick,
					'renderDay': renderDay,
					'daySize': daySize,
					'focusedDate': isVisible ? focusedDate : null,
					'isFocused': isFocused,
					'phrases': phrases
				}, month.format('YYYY-MM'));
			}), 0, {
				'style': style,
				'onTransitionEnd': onMonthTransitionEnd
			}, null, function (ref) {
				_this2.container = ref;
			});
		}
	}]);

	return CalendarMonthGrid;
}(_inferno.Component);

exports.default = CalendarMonthGrid;


CalendarMonthGrid.propTypes = propTypes;
CalendarMonthGrid.defaultProps = defaultProps;