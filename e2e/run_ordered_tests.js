const { execSync } = require('child_process');

const testFiles = [
  'starter.test.js',
  'login.test.js',
//   'products.test.js',
];

for (const file of testFiles) {
  console.log(`\nRunning test file: ${file}`);
  try {
    execSync(`detox test --testNamePattern="${file}"`, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(`Test failed for ${file}:`, error.message);
    process.exit(1); // Exit with an error code if a test fails.
  }
}

console.log('\nAll tests completed successfully.');