const fs = require('fs');
const path = require('path');

// Function to parse the test data file
function parseTestData(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');
  const testData = {
    tapOn: {},
    input: {},
    assertive: {},
    takeScreenshot:{}
  };
  let currentSection = null;

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('###')) continue;

    if (line.trim().toLowerCase() === 'tapon') {
      currentSection = 'tapOn';
      continue;
    } else if (line.trim().toLowerCase() === 'input') {
      currentSection = 'input';
      continue;
    } else if (line.trim().toLowerCase() === 'assertive') {
      currentSection = 'assertive';
      continue;
    } else if (line.trim().toLowerCase() === 'takescreenshot') {
      currentSection = 'takeScreenshot';
      continue;
    }

    if (currentSection) {
      const parts = line.split('=');
      if (parts.length === 2) {
        const key = parts[0].trim();
        const value = parts[1].trim().replace(/^"|"$/g, '');
        testData[currentSection][key] = value;
      }
    }
  }

  return testData;
}

// Function to transform parsed data into template variables
function transformTestData(parsedData) {
  return {
    owner_name_input: parsedData.input.owner_name_input,
    owner_mobile: parsedData.input.owner_mobile,
    owner_address: parsedData.input.owner_address,
    locaity_details_city: parsedData.input.locaity_details_city,
    locaity_details_location: parsedData.input.locaity_details_location,
    locaity_details_location_suggestion: `${parsedData.input.locaity_details_location} Beach, Maharashtra`,
    locaity_details_building_name: parsedData.input.locaity_details_building_name,
    locaity_details_landmark: parsedData.input.locaity_details_landmark,
    property_details_property_type_lower: parsedData.tapOn.property_details_property_type.toLowerCase(),
    property_details_building_type_lower: parsedData.tapOn.property_details_building_type.toLowerCase(),
    property_details_ideal_for_lower: parsedData.tapOn.property_details_ideal_for.toLowerCase(),
    property_details_parkings_lower: parsedData.tapOn.property_details_parkings.toLowerCase(),
    property_details_power_backup_lower: parsedData.tapOn.property_details_power_backup.toLowerCase(),
    property_details_property_size: parsedData.input.property_details_property_size,
    sell_details_expected_sell_price: parsedData.input.sell_details_expected_sell_price,
    sell_details_maintenance: parsedData.input.sell_details_maintenance,
    sell_details_available_from: parsedData.tapOn.sell_details_available_from,
    sell_details_negotiable_lower: parsedData.tapOn.sell_details_negotiable.toLowerCase(),
    final_details_screenshot: parsedData.takeScreenshot.final_details_screenshot,
    final_details_top_header: parsedData.assertive.final_details_top_header,
    final_details_sub_header: parsedData.assertive.final_details_sub_header,
    final_details_building_type_value: parsedData.assertive.final_details_building_type_value,
    final_details_age_of_building_type: parsedData.assertive.final_details_age_of_building_type,
    final_details_property_title: `Sell Off In ${parsedData.input.locaity_details_building_name}`
  };
}

// Function to generate YAML from template and data
function generateYaml(template, data) {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) {
      throw new Error(`Missing required value for key: ${key}`);
    }
    result = result.replace(new RegExp(`\\\${${key}}`, 'g'), value);
  }
  return result;
}

// Function to create test data variations for multiple files
function createTestDataVariations(baseData) {
  return [
    { ...baseData, variation: '1' },
    { 
      ...baseData, 
      variation: '2',
      owner_name_input: 'CSP2',
      owner_mobile: '9833044442',
      locaity_details_flat_num: 'CSP2 F2 Wing 2',
      locaity_details_building_name: 'CSP2 Building 2',
      locaity_details_landmark: 'CSP2 Landmark 2',
      final_details_screenshot: 'final_details_commercial_sell_property_2',
      final_details_top_header: '.*Building 2.*',
      final_details_owner_name: 'CSP2',
      final_details_owner_mobile: '9833044442'
    },
    // { 
    //   ...baseData, 
    //   variation: '2',
    //   owner_name_input: `${baseData.owner_name_input}_v2`,
    //   property_details_building_type_lower: 'office',
    //   sell_details_expected_sell_price: '35000000'
    // },
    // { 
    //   ...baseData, 
    //   variation: '3',
    //   property_details_property_type_lower: 'office',
    //   property_details_ideal_for_lower: 'office',
    //   sell_details_maintenance: '5000'
    // },
    // { 
    //   ...baseData, 
    //   variation: '4',
    //   property_details_power_backup_lower: 'no',
    //   property_details_parkings_lower: 'private',
    //   sell_details_negotiable_lower: 'no'
    // }
  ];
}

const dataFileLocation = '../../dataset/property/commercial_sell_property_data.txt'
const templateFileLocation = '../../ios/template/property/add_commercial_sell_property_template.yaml';

// Main execution
const dataFilePath = path.join(__dirname, dataFileLocation);
const templateFilePath = path.join(__dirname, templateFileLocation);

try {
  // Parse the test data file
  const parsedData = parseTestData(dataFilePath);
  
  // Transform the parsed data into template variables
  const baseTemplateData = transformTestData(parsedData);
  
  // Create 4 variations of test data
  const testDataVariations = createTestDataVariations(baseTemplateData);
  
  // Read the template
  const template = fs.readFileSync(templateFilePath, 'utf8');
  
  // Generate YAML files for each variation
  testDataVariations.forEach((testData, index) => {
    const outputFilePath = path.join(__dirname, `../../ios/property/add_commercial_sell_test_case_${index + 1}.yaml`);
    const yamlContent = generateYaml(template, testData);
    fs.writeFileSync(outputFilePath, yamlContent);
    console.log(`Generated commercial sell test case ${index + 1} at: ${outputFilePath}`);
  });
  
} catch (error) {
  console.error('Error generating test cases:', error);
  process.exit(1);
}