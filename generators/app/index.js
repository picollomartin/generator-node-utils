const Generator = require('yeoman-generator');
const cfonts = require('cfonts');

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
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
  }

  install() {
    this.installDependencies({ npm: true, bower: false, yarn: false });
  }
};
