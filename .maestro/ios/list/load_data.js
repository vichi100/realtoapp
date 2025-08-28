const fs = require('fs');
const path = require('path');

// Use absolute path to be safe
const configPath = path.join(__dirname, 'config.json');
const testData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

maestro.variables.user = testData.username;
maestro.variables.pass = testData.password;
console.log("Loaded user:", maestro.variables.user);