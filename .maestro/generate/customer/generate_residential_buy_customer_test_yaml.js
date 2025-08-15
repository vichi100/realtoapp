const fs = require('fs');
const path = require('path');

// Function to parse the test data file
function parseTestData(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');
  const testData = {
    input: {},
    tapOn: {},
    assertive: {},
    takeScreenshot: {}
  };
  let currentSection = null;

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('###')) continue;

    if (line.trim().toLowerCase() === 'input') {
      currentSection = 'input';
      continue;
    } else if (line.trim().toLowerCase() === 'tapon') {
      currentSection = 'tapOn';
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

// Function to transform parsed data into template variables
function transformTestData(parsedData) {
  return {
    customer_details_name: parsedData.input.customer_deatils_name,
    customer_details_mobile: parsedData.input.customer_deatils_mobile,
    customer_details_address: parsedData.input.customer_deatils_address,
    locality_details_city: parsedData.input.locaity_details_city,
    locality_details_location: parsedData.input.locaity_details_location,
    locality_details_location_suggestion: `${parsedData.input.locaity_details_location} Beach, Maharashtra`,
    locality_details_select_property_type_lower: parsedData.tapOn.locaity_details_select_property_type.toLowerCase(),
    locality_details_select_property_for_lower: parsedData.tapOn.locaity_details_select_property_for.toLowerCase(),
    property_details_house_type_lower: parsedData.tapOn.property_details_house_type.toLowerCase(),
    property_details_size_of_bhk_lower: parsedData.tapOn.property_details_size_of_bhk.toLowerCase(),
    property_details_furnishing_lower: parsedData.tapOn.property_details_furnishing.toLowerCase(),
    property_details_parkings_lower: parsedData.tapOn.property_details_parkings.toLowerCase(),
    property_details_lift_mandatory_lower: parsedData.tapOn.property_details_lift_mandatory.toLowerCase(),
    buy_details_expected_buy_price: parsedData.input.buy_details_expected_buy_price,
    buy_details_required_from: parsedData.tapOn.buy_details_required_from,
    buy_details_negotiable_lower: parsedData.tapOn.buy_details_negotiable.toLowerCase(),
    final_details_looking_for_tag_value: parsedData.assertive.final_details_looking_for_tag_value,
    final_details_looking_for_tag: parsedData.assertive.final_details_looking_for_tag,
    final_details_max_buy_tag_value: parsedData.assertive.final_details_max_but_tag_value,
    final_details_max_buy_tag: parsedData.assertive.final_details_max_buy_tag,
    final_details_city_tag: parsedData.assertive.final_details_city_tag,
    final_details_city_tag_value: parsedData.assertive.final_details_city_tag_value,
    final_details_locations_tag: parsedData.assertive.final_details_locations_tag,
    final_details_locations_tag_value: parsedData.assertive.final_details_locations_tag_value,
    final_details_parking_tag_value: parsedData.assertive.final_details_parking_tag_value,
    final_details_parking_tag: parsedData.assertive.final_details_parking_tag,
    final_details_lift_tag: parsedData.assertive.final_details_lift_tag,
    final_details_lift_tag_value: parsedData.assertive.final_details_lift_tag_value
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
    { ...baseData, 
      variation: '2',
      customer_details_name: 'Customer Buy Residential 2',
      customer_details_mobile: '9933066662',
      customer_details_address: 'Juhu Mumbai',
      final_details_name_header: '.*Customer Buy Residential 2.*',
      final_details_mobile_header: '.*9933066662.*',
    },
    
    // { 
    //   ...baseData, 
    //   variation: '2',
    //   customer_details_name: `${baseData.customer_details_name}_v2`,
    //   property_details_size_of_bhk_lower: '3bhk',
    //   buy_details_expected_buy_price: '35000000'
    // },
    // { 
    //   ...baseData, 
    //   variation: '3',
    //   property_details_furnishing_lower: 'full',
    //   locality_details_required_for_lower: 'bachelor',
    //   buy_details_negotiable_lower: 'no'
    // },
    // { 
    //   ...baseData, 
    //   variation: '4',
    //   property_details_lift_mandatory_lower: 'no',
    //   locality_details_location: 'Andheri',
    //   locality_details_location_suggestion: 'Andheri West, Maharashtra'
    // }
  ];
}

const dataFileLocation = '../../dataset/customer/residential_buy_customer_data.txt'
const templateFileLocation = '../../ios/template/customer/add_residential_buy_customer_template.yaml';

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
    const outputFilePath = path.join(__dirname, `../../ios/customer/add_residential_buy_customer_test_case_${index + 1}.yaml`);
    const yamlContent = generateYaml(template, testData);
    fs.writeFileSync(outputFilePath, yamlContent);
    console.log(`Generated residential buy customer test case ${index + 1} at: ${outputFilePath}`);
  });
  
} catch (error) {
  console.error('Error generating test cases:', error);
  process.exit(1);
}