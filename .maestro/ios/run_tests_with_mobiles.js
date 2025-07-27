const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("🚀 Script started...");

// === Config ===
const mobileNumbers = ['9000000001', '9000000002', ]; // Add more if needed '9000000003'
const loginYamlPath = path.join(__dirname, 'login.yaml');
const suiteYamlPath = path.join(__dirname, 'test_suite.yaml');
const suiteBackupPath = path.join(__dirname, 'test_suite_backup.yaml');

// === Backup test_suite.yaml on first run
if (!fs.existsSync(suiteBackupPath)) {
  fs.copyFileSync(suiteYamlPath, suiteBackupPath);
}

// === Loop through each mobile number
mobileNumbers.forEach((mobile, index) => {
  const variation = index + 1;

  // 1️⃣ Update mobile in login.yaml
  let loginYaml = fs.readFileSync(loginYamlPath, 'utf8');
  loginYaml = loginYaml.replace(/inputText:\s*"(\d{10})"/, `inputText: "${mobile}"`);
  loginYaml = loginYaml.replace(/\+91\s\d{10}/, `+91 ${mobile}`);
  fs.writeFileSync(loginYamlPath, loginYaml);
  console.log(`📱 Updated login.yaml with mobile: ${mobile}`);

  // 2️⃣ Update _1 to _<variation> in test_suite.yaml
  let suiteYaml = fs.readFileSync(suiteBackupPath, 'utf8');
  suiteYaml = suiteYaml.replace(/_1\.yaml/g, `_${variation}.yaml`);
  fs.writeFileSync(suiteYamlPath, suiteYaml);
  console.log(`🔁 Updated test_suite.yaml to use variation _${variation}`);

  // 3️⃣ Run the test suite
  try {
    console.log(`🚀 Running test suite for mobile ${mobile}...`);
    execSync(`maestro test ${suiteYamlPath}`, { stdio: 'inherit' });
    console.log(`✅ Test suite for ${mobile} completed.\n`);
  } catch (err) {
    console.error(`❌ Test failed for ${mobile}:`, err.message);
  }
});



// How to run this script:
// vichirajan@192 realtoapp % cd .maestro/ios 
// vichirajan@192 ios % pwd
// /Users/vichirajan/Documents/realto/realtoapp/.maestro/ios
// vichirajan@192 ios % node run_tests_with_mobiles.js 