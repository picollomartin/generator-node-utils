const { runGenerator, getFileContent } = require('./utils/generators');
const { toolsOptions } = require('./utils/constants');

describe.each(toolsOptions)('%s tool', (toolName, options) => {
  const templates = options.templates.map(template => [template.name, template]);
  const templatePrompts = options.templates.reduce(
    (prompts, template) => ({ ...prompts, [`${toolName}${template.name}`]: template.recommendedPath }),
    {}
  );
  const toolPrompts = options.prompts.reduce(
    (prompts, prompt) => ({ ...prompts, [prompt.name]: prompt.example }),
    {}
  );

  beforeAll(() =>
    runGenerator({
      tool: toolName,
      ...toolPrompts,
      ...templatePrompts
    })
  );

  test.each(templates)('creates expected template %s', (_, templateOptions) => {
    expect(getFileContent(templateOptions.recommendedPath)).toMatchSnapshot();
  });
});
