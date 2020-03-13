const { matchers } = require('jest-json-schema');

const expectedToolSchema = require('./utils/schemas/tool_schema.json');
const { toolsOptions } = require('./utils/constants');

expect.extend(matchers);

describe('generic tool schemas', () => {
  it.each(toolsOptions)('should match schema for tool: %s', (_, toolSchema) => {
    expect(toolSchema).toMatchSchema(expectedToolSchema);
  });
});
