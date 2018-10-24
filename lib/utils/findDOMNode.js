"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = findDOMNode;
function findDOMNode(ref) {
    if (ref && ref.nodeType) {
        return ref;
    }
    if (!ref || ref.$UN) {
        return null;
    }
    if (ref.$LI) {
        return ref.$LI.dom;
    }
    return null;
}