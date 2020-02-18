/* eslint-disable no-underscore-dangle */
const Generator = require('yeoman-generator');
const cfonts = require('cfonts');
const chalk = require('chalk');
const chalkTemplate = require('chalk/source/templates');

const tools = require('./tools.json');

const getToolPrompts = () => [
  {
    type: 'list',
    name: 'tool',
    message: 'Select what tool do you want to include in your project: ',
    choices: Object.keys(tools).map(optionName => ({
      name: tools[optionName].name,
      value: optionName
    }))
  }
];

const generator = class extends Generator {
  _copyTplPromise(templatePath, destinationPath, toolProps) {
    return new Promise((resolve, reject) => {
      try {
        this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath(destinationPath), toolProps);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  _showFormattedMessage(message) {
    if (message) {
      this.log(chalkTemplate(chalk, `\n${message}\n`));
    }
  }

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

    const prompts = getToolPrompts();

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.tool = tools[props.tool];
      this.templates = this.tool.templates;
      this.packages = this.tool.packages || [];

      this._showFormattedMessage(this.tool.welcomeMessage);

      const toolPrompts = [
        ...this.tool.prompts,
        ...this.tool.templates.map(template => ({
          type: 'input',
          name: `${this.props.tool}${template.name}`,
          message: template.message || `Select directory for template ${template.templatePath}: `,
          default: template.recommendedPath
        }))
      ];

      return this.prompt(toolPrompts).then(toolProps => {
        this.toolProps = toolProps;
      });
    });
  }

  writing() {
    return Promise.all(
      this.templates.map(template =>
        this._copyTplPromise(
          template.templatePath,
          this.toolProps[`${this.props.tool}${template.name}`],
          this.toolProps
        )
      )
    );
  }

  install() {
    this.npmInstall(this.packages);
    this._showFormattedMessage(this.tool.finalMessage);
  }
};

module.exports = generator;
