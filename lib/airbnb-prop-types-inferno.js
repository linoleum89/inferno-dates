'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.typeOf = typeOf;
exports.wrapValidator = wrapValidator;
exports.default = childrenHavePropXorChildren;
exports.forbidExtraProps = forbidExtraProps;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var zeroWidthSpace = '\u200B';
var semaphore = {};

function typeOf(child) {
  if (child === null) {
    return 'null';
  }
  if (Array.isArray(child)) {
    return 'array';
  }
  if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object') {
    return typeof child === 'undefined' ? 'undefined' : _typeof(child);
  }
  if (child.flags) {
    return child.flags & 3970 ? 'Element' : 'null';
  }
  return child;
}

function wrapValidator(validator, typeName) {
  var typeChecker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return (0, _objectAssign2.default)(validator.bind(), {
    typeName: typeName,
    typeChecker: typeChecker,
    isRequired: (0, _objectAssign2.default)(validator.isRequired.bind(), {
      typeName: typeName,
      typeChecker: typeChecker,
      typeRequired: true
    })
  });
}

function childrenHavePropXorChildren(prop) {
  if (typeof prop !== 'string' && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) !== 'symbol') {
    throw new TypeError('invalid prop: must be string or symbol');
  }

  var validator = function childrenHavePropXorChildrenWithProp(_ref, _, componentName) {
    var children = _ref.children;


    return null;
    // const childrenCount = React.Children.count(children);
    // let propCount = 0;
    // let grandchildrenCount = 0;

    // React.Children.forEach(children, (child) => {
    //   if (child.props[prop]) {
    //     propCount += 1;
    //   }
    //   if (React.Children.count(child.props.children)) {
    //     grandchildrenCount += 1;
    //   }
    // });

    // if (
    //   (propCount === childrenCount && grandchildrenCount === 0) ||
    //   (propCount === 0 && grandchildrenCount === childrenCount) ||
    //   (propCount === 0 && grandchildrenCount === 0)
    // ) {
    //   return null;
    // }

    return new TypeError('`' + componentName + '` requires children to all have prop \u201C' + prop + '\u201D, all have children, or all have neither.');
  };
  validator.isRequired = validator;

  return wrapValidator(validator, 'childrenHavePropXorChildrenWithProp:' + prop, prop);
}

function forbidExtraProps(propTypes) {
  if (!isPlainObject(propTypes)) {
    throw new TypeError('given propTypes must be an object');
  }
  if ((0, _has2.default)(propTypes, zeroWidthSpace) && !isBranded(propTypes[zeroWidthSpace])) {
    throw new TypeError('Against all odds, you created a propType for a prop named after the zero-width space - which, sadly, conflicts with `forbidExtraProps`');
  }

  return (0, _objectAssign2.default)({}, propTypes, _defineProperty({}, zeroWidthSpace, brand(function forbidUnknownProps(props, _, componentName) {
    var unknownProps = Object.keys(props).filter(function (prop) {
      return !(0, _has2.default)(propTypes, prop);
    });
    if (unknownProps.length > 0) {
      return new TypeError(componentName + ': unknown props found: ' + unknownProps.join(', '));
    }
    return null;
  })));
}

function brand(fn) {
  return (0, _objectAssign2.default)(fn, _defineProperty({}, zeroWidthSpace, semaphore));
}

function isBranded(value) {
  return value && value[zeroWidthSpace] === semaphore;
}

function isPlainObject(x) {
  return x && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && !Array.isArray(x);
}