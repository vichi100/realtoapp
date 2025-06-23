
const envFile = process.env.ENVFILE || '.env';

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['babel-plugin-dotenv-import', {
        "moduleName": "@env", // The alias you'll use to import env vars
        "path": envFile,      // Path to your .env file
        "blacklist": null,   // An array of env vars to exclude from being imported
        "whitelist": [
          "REALTO_APP_SERVER_URL",
          "REALTO_WEB_APP_URL",
          "REALTO_GOOGLE_PLACES_API_KEY",
          "REALTO_EMAIL_PDF_SERVER_URL"
        ],   // An array of env vars to include (if blacklist is null)
        "safe": false,        // Set to true to use .env.example
        "allowUndefined": false // Set to false if you want error for undefined vars (when safe: true)
      }]
    ]
  };
};