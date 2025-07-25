const fs = require('fs');
const path = require('path');

// Function to parse the test data file
function parseTestData(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');
  const testData = {
    tapOn: {},
    input: {},
    assertive: {}
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

// Function to transform parsed data into template variables (no default values)
function transformTestData(parsedData) {
  return {
    owner_name_input: parsedData.input.owner_name_input,
    owner_mobile: parsedData.input.owner_mobile,
    owner_address: parsedData.input.owner_address,
    locaity_details_city: parsedData.input.locaity_details_city,
    locaity_details_location: parsedData.input.locaity_details_location,
    locaity_details_location_suggestion: `${parsedData.input.locaity_details_location} Beach, Maharashtra`,
    locaity_details_flat_num: parsedData.input.locaity_details_flat_num,
    locaity_details_building_name: parsedData.input.locaity_details_building_name,
    locaity_details_landmark: parsedData.input.locaity_details_landmark,
    property_details_house_type_lower: parsedData.tapOn.property_details_house_type,
    property_details_size_of_bhk_lower: parsedData.tapOn.property_details_size_of_bhk,
    property_details_how_many_washroom: parsedData.tapOn.property_details_how_many_washroom,
    property_details_furnishing_lower: parsedData.tapOn.property_details_furnishing,
    property_details_parkings: parsedData.tapOn.property_details_parkings,
    property_details_parking_type_lower: parsedData.tapOn.property_details_parking_type,
    property_details_property_age: parsedData.tapOn.property_details_property_age,
    property_details_floor: parsedData.input.property_details_floor,
    property_details_total_floor: parsedData.input.property_details_total_floor,
    property_details_lift_lower: parsedData.tapOn.property_details_lift,
    property_details_property_size: parsedData.input.property_details_property_size,
    rent_details_expected_rent: parsedData.input.rent_details_expected_rent,
    rent_details_expected_deposit: parsedData.input.rent_details_expected_deposit,
    rent_details_available_from: parsedData.tapOn.rent_details_available_from,
    final_details_top_header: parsedData.assertive.final_details_top_header,
    final_details_sub_header: parsedData.assertive.final_details_sub_header,
    final_details_floor_type_value: parsedData.assertive.final_details_floor_type_value,
    final_details_age_of_building_type: parsedData.assertive.final_details_age_of_building_type,
    final_details_furnishing_type_value: parsedData.assertive.final_details_furnishing_type_value,
    final_details_property_title: `Rent In ${parsedData.input.locaity_details_building_name}`
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
    // { 
    //   ...baseData, 
    //   variation: '2',
    //   owner_name_input: `${baseData.owner_name_input}_v2`,
    //   property_details_floor: '15',
    //   property_details_total_floor: '30'
    // },
    // { 
    //   ...baseData, 
    //   variation: '3',
    //   property_details_size_of_bhk_lower: '3bhk',
    //   property_details_how_many_washroom: '3',
    //   rent_details_expected_rent: '40000'
    // },
    // { 
    //   ...baseData, 
    //   variation: '4',
    //   property_details_furnishing_lower: 'full',
    //   property_details_property_age: '1-5',
    //   rent_details_expected_deposit: '200000'
    // }
  ];
}

const dataFileLocation = '../../dataset/residential_rent_property_data.txt'
const templateFileLocation = '../../ios/template/property/add_residential_rent_property_template.yaml';

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
  
  // Generate YAML files for each variation
  const template = fs.readFileSync(templateFilePath, 'utf8');
  
  testDataVariations.forEach((testData, index) => {
    // .maestro/ios/property
    const outputFilePath = path.join(__dirname, `../../ios/property/add_residential_rent_test_case_${index + 1}.yaml`);
    const yamlContent = generateYaml(template, testData);
    fs.writeFileSync(outputFilePath, yamlContent);
    console.log(`Generated test case ${index + 1} at: ${outputFilePath}`);
  });
  
} catch (error) {
  console.error('Error generating test cases:', error);
  process.exit(1);
}