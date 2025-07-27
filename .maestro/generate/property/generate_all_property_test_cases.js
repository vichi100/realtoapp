const { execSync } = require('child_process');
const path = require('path');

const scripts = [
  '../property/generate_residential_rent_property_test_yaml.js',
  '../property/generate_residential_sell_property_test_yaml.js',
  '../property/generate_commercial_rent_property_test_yaml.js',
  '../property/generate_commercial_sell_property_test_yaml.js',
  
];

console.log('🚀 Starting test case generation...');

scripts.forEach((scriptPath) => {
  try {
    console.log(`▶️ Running ${scriptPath}...`);
    const fullPath = path.join(__dirname, scriptPath);
    execSync(`node "${fullPath}"`, { stdio: 'inherit' });
    console.log(`✅ ${scriptPath} completed successfully\n`);
  } catch (err) {
    console.error(`❌ Error running ${scriptPath}`);
    console.error(err.message);
    process.exit(1);
  }
});

console.log('🎉 All test cases generated successfully!');
