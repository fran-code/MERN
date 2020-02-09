"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var noteSchema = new _mongoose.Schema({
  title: String,
  content: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  date: Date
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Note', noteSchema);

exports["default"] = _default;
//# sourceMappingURL=note.js.map