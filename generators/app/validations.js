const validateRegex = (regex, message) => value => regex.test(value) || message;

const APP_NAME_REGEX = /^[\w-]+$/;
const validateAppName = validateRegex(APP_NAME_REGEX, 'Please enter a valid app name (alphanumeric)');

exports.validations = {
  alphanumeric: validateAppName
};
