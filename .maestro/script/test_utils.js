// Generate test data
function generateTestEmail() {
  return `user${Math.floor(Math.random() * 1000)}@test.com`;
}

// Must export functions
module.exports = { generateTestEmail };