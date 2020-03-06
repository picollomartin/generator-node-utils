const validateRegex = (regex, message) => value => regex.test(value) || message;

const ALPHANUMERIC_REGEX = /^[\w-]+$/;
const alphanumeric = validateRegex(ALPHANUMERIC_REGEX, 'Please enter a valid alphanumeric value');

exports.validations = {
  alphanumeric
};
