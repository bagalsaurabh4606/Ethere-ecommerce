const Dotenv = require('dotenv-webpack');

module.exports = {
  // other webpack configuration options...
  plugins: [
    new Dotenv()
  ],
  // If you're using create-react-app, add this to enable custom Webpack configuration
  resolve: {
    fallback: {
      "process": require.resolve("process/browser"),
    },
  },
};