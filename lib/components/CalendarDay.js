'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getModifiersForDay = getModifiersForDay;

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

var _getPhrase = require('../utils/getPhrase');

var _getPhrase2 = _interopRequireDefault(_getPhrase);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypesInferno.forbidExtraProps)({
	day: _momentProptypesInferno2.default.momentObj,
	daySize: _propTypes2.default.number,
	isOutsideDay: _propTypes2.default.bool,
	modifiers: _propTypes2.default.object,
	isFocused: _propTypes2.default.bool,
	tabIndex: _propTypes2.default.oneOf([0, -1]),
	onDayClick: _propTypes2.default.func,
	onDayMouseEnter: _propTypes2.default.func,
	onDayMouseLeave: _propTypes2.default.func,
	renderDay: _propTypes2.default.func,

	// internationalization
	phrases: _propTypes2.default.shape((0, _getPhrasePropTypes2.default)(_defaultPhrases.CalendarDayPhrases))
});

var defaultProps = {
	day: (0, _moment2.default)(),
	daySize: _constants.DAY_SIZE,
	isOutsideDay: false,
	modifiers: {},
	isFocused: false,
	tabIndex: -1,
	onDayClick: function onDayClick() {},
	onDayMouseEnter: function onDayMouseEnter() {},
	onDayMouseLeave: function onDayMouseLeave() {},

	renderDay: null,

	// internationalization
	phrases: _defaultPhrases.CalendarDayPhrases
};

function getModifiersForDay(modifiers, day) {
	return day ? Object.keys(modifiers).filter(function (key) {
		return modifiers[key](day);
	}) : [];
}

var CalendarDay = function (_Component) {
	_inherits(CalendarDay, _Component);

	function CalendarDay() {
		_classCallCheck(this, CalendarDay);

		return _possibleConstructorReturn(this, (CalendarDay.__proto__ || Object.getPrototypeOf(CalendarDay)).apply(this, arguments));
	}

	_createClass(CalendarDay, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var _props = this.props,
			    isFocused = _props.isFocused,
			    tabIndex = _props.tabIndex;

			if (tabIndex === 0) {
				if (isFocused || tabIndex !== prevProps.tabIndex) {
					this.buttonRef.focus();
				}
			}
		}
	}, {
		key: 'onDayClick',
		value: function onDayClick(day, e) {
			var onDayClick = this.props.onDayClick;

			onDayClick(day, e);
		}
	}, {
		key: 'onDayMouseEnter',
		value: function onDayMouseEnter(day, e) {
			var onDayMouseEnter = this.props.onDayMouseEnter;

			onDayMouseEnter(day, e);
		}
	}, {
		key: 'onDayMouseLeave',
		value: function onDayMouseLeave(day, e) {
			var onDayMouseLeave = this.props.onDayMouseLeave;

			onDayMouseLeave(day, e);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    day = _props2.day,
			    daySize = _props2.daySize,
			    isOutsideDay = _props2.isOutsideDay,
			    modifiers = _props2.modifiers,
			    renderDay = _props2.renderDay,
			    tabIndex = _props2.tabIndex,
			    _props2$phrases = _props2.phrases,
			    chooseAvailableDate = _props2$phrases.chooseAvailableDate,
			    dateIsUnavailable = _props2$phrases.dateIsUnavailable;


			if (!day) return (0, _inferno.createVNode)(1, 'td');

			var modifiersForDay = getModifiersForDay(modifiers, day);

			var className = (0, _classnames2.default)('CalendarDay', {
				'CalendarDay--outside': isOutsideDay
			}, modifiersForDay.map(function (mod) {
				return 'CalendarDay--' + mod;
			}));

			var formattedDate = day.format('dddd') + ', ' + day.format('LL');

			var ariaLabel = (0, _getPhrase2.default)(chooseAvailableDate, {
				date: formattedDate
			});

			if (_constants.BLOCKED_MODIFIER in modifiers && modifiers[_constants.BLOCKED_MODIFIER](day)) {
				ariaLabel = (0, _getPhrase2.default)(dateIsUnavailable, { date: formattedDate });
			}

			var daySizeStyles = {
				width: daySize + 'px',
				height: daySize - 1 + 'px'
			};

			return (0, _inferno.createVNode)(1, 'td', className, (0, _inferno.createVNode)(1, 'button', 'CalendarDay__button', renderDay ? renderDay(day) : day.format('D'), 0, {
				'type': 'button',
				'aria-label': ariaLabel,
				'onMouseEnter': function onMouseEnter(e) {
					_this2.onDayMouseEnter(day, e);
				},
				'onMouseLeave': function onMouseLeave(e) {
					_this2.onDayMouseLeave(day, e);
				},
				'onMouseUp': function onMouseUp(e) {
					e.currentTarget.blur();
				},
				'onClick': function onClick(e) {
					_this2.onDayClick(day, e);
				},
				'tabIndex': tabIndex
			}, null, function (ref) {
				_this2.buttonRef = ref;
			}), 2, {
				'style': daySizeStyles
			});
		}
	}]);

	return CalendarDay;
}(_inferno.Component);

exports.default = CalendarDay;


CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;