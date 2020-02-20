const { matchers } = require('jest-json-schema');

const tools = require('../generators/app/tools.json');
const expectedToolSchema = require('./utils/schemas/tool_schema.json');

expect.extend(matchers);

const toolsOptions = Object.keys(tools).map(toolName => [toolName, tools[toolName]]);

describe('generic tool schemas', () => {
  it.each(toolsOptions)('should match schema for tool: %s', (_, toolSchema) => {
    expect(toolSchema).toMatchSchema(expectedToolSchema);
  });
});
