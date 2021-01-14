const Parser = require("./Parser");
const Request = require("./Request");
const { MockIds } = require("./constants");

const parser = new Parser(Request);

parser.parse(MockIds);