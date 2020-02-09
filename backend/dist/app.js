"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _schema = _interopRequireDefault(require("./graphql/schema"));

var _database = require("./database");

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _notes = _interopRequireDefault(require("./axios/routes/notes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // Initializations


var app = (0, _express["default"])();
(0, _database.connect)(); // Settings

app.set('port', process.env.PORT || 4000); // GraphQl

app.use('/graphql', (0, _expressGraphql["default"])({
  graphiql: true,
  schema: _schema["default"]
})); // AXIOS

app.use((0, _cors["default"])());
app.use(_express["default"].json()); // routes

app.use('/api/notes', _notes["default"]);
//# sourceMappingURL=app.js.map