const Generator = require('yeoman-generator');
const cfonts = require('cfonts');
const chalk = require('chalk');
const chalkTemplate = require('chalk/templates');

const options = require('./options.json');

module.exports = class extends Generator {
  prompting() {
    cfonts.say('NODE JS|UTILS', {
      font: 'block',
      align: 'center',
      colors: ['green', 'green'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0'
    });

    const prompts = [
      {
        type: 'list',
        name: 'tool',
        message: 'Select what tool do you want to include in your project: ',
        choices: Object.keys(options).map(optionName => ({
          name: options[optionName].name,
          value: optionName
        }))
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;

      const tool = options[this.props.tool];
      if (tool.welcomeMessage) {
        this.log(chalkTemplate(chalk, `\n${tool.welcomeMessage}\n`));
      }

      this.templates = tool.templates;

      const toolPrompts = [
        ...tool.prompts,
        ...tool.templates.map(template => ({
          type: 'input',
          name: `${this.props.tool}${template.name}`,
          message: template.message || `Select directory for template ${template.templatePath}: `,
          default: template.recommendedPath
        }))
      ];

      return this.prompt(toolPrompts).then(toolProps => {
        this.props = { ...this.props, ...toolProps };
      });
    });
  }

  writing() {
    this.templates.forEach(template => {
      this.fs.copy(
        this.templatePath(template.templatePath),
        this.destinationPath(this.props[`${this.props.tool}${template.name}`])
      );
    });
  }

  install() {
    this.npmInstall(this.packages);
  }
};
