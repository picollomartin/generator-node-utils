/* eslint-disable no-underscore-dangle */
const Generator = require('yeoman-generator');
const cfonts = require('cfonts');
const chalk = require('chalk');
const chalkTemplate = require('chalk/source/templates');
const { validations } = require('./validations');

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

  _getToolPackages() {
    const toolPackages = this.tool.packages || [];
    const packages = { dev: [], prod: [] };
    toolPackages.forEach(toolPackage => {
      packages[toolPackage.type].push(`${toolPackage.name}@${toolPackage.version}`);
    });

    return packages;
  }

  _installDependencies() {
    if (this.packages.dev) {
      this.npmInstall(this.packages.dev, { 'save-dev': true });
    }
    if (this.packages.prod) {
      this.npmInstall(this.packages.prod, { save: true });
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
      this.packages = this._getToolPackages();

      this._showFormattedMessage(this.tool.welcomeMessage);
      const toolPrompts = [
        ...this.tool.prompts.map(prompt => ({ ...prompt, validate: validations[prompt.validate] })),
        ...this.tool.templates.map(template => ({
          type: 'input',
          name: `${this.props.tool}${template.name}`,
          message: template.message || `Select directory for template ${template.templatePath}: `,
          default: template.recommendedPath,
          when: response => (template.conditionalPrompt ? response[template.conditionalPrompt] : true)
        }))
      ];

      return this.prompt(toolPrompts).then(toolProps => {
        this.toolProps = toolProps;
      });
    });
  }

  writing() {
    return Promise.all(
      this.templates
        .filter(template => this.toolProps[`${this.props.tool}${template.name}`])
        .map(template =>
          this._copyTplPromise(
            template.templatePath,
            this.toolProps[`${this.props.tool}${template.name}`],
            this.toolProps
          )
        )
    );
  }

  install() {
    this._installDependencies();
    this._showFormattedMessage(this.tool.finalMessage);
  }
};

module.exports = generator;
