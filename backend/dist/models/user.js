"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var _default = (0, _mongoose.model)('User', userSchema);

exports["default"] = _default;
//# sourceMappingURL=user.js.map