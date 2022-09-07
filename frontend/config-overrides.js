const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  return alias({
    src: 'src',
    services: 'src/services',
    utilities: 'src/utilities',
    q_and_a: 'src/components/q_and_a',
  })(config);
};
