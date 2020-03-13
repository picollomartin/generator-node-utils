const tools = require('../../generators/app/tools.json');

exports.toolsOptions = Object.keys(tools).map(toolName => [toolName, tools[toolName]]);
