"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("../primitives/platform/platform");
var theme_1 = require("./theme");
function isObject(obj) {
    return obj && obj instanceof Object && obj.constructor === Object;
}
exports.isObject = isObject;
exports.isXs = function () { return platform_1.getWindowWidth() < theme_1.XS_BREAKING_POINT; };
//# sourceMappingURL=common.js.map