const fs = require("fs");

// Base data (common for all test cases)
const baseData = {
    "owner_name_input": "RRP1",
  "owner_mobile": "9833011111",
  "owner_address": "juhu mumbai",
  "locaity_details_city": "Mumbai",
  "locaity_details_location": "Juhu",
  "locaity_details_location_suggestion": "Juhu Beach, Maharashtra",
  "locaity_details_flat_num": "RRP1 F1 Wing 1",
  "locaity_details_building_name": "RRP1 Building 1",
  "locaity_details_landmark": "RRP1 Landmark 1",
  "property_details_house_type_lower": "apartment",
  "property_details_size_of_bhk_lower": "2bhk",
  "property_details_how_many_washroom": "2",
  "property_details_furnishing_lower": "semi",
  "property_details_parkings": "2",
  "property_details_parking_type_lower": "car",
  "property_details_property_age": "6-10",
  "property_details_floor": "20",
  "property_details_total_floor": "25",
  "property_details_lift_lower": "yes",
  "property_details_property_size": "500",
  "rent_details_expected_rent": "30000",
  "rent_details_expected_deposit": "150000",
  "rent_details_available_from": "30",
  "final_details_screenshot": "final_details_residential_rent_property_1",
  "final_details_top_header": "RRP1 F1 Wing 1",
  "final_details_sub_header": "RRP1 Landmark 1",
  "final_details_floor_type_value": "20/25",
  "final_details_age_of_building_type": "6-10",
  "final_details_furnishing_type_value": "Semi"
};

// Function to create test data variations
function createTestDataVariations(baseData) {
  return [
    {
      ...baseData,
      variation: "1" // first case same as base
    },
    // {
    //   ...baseData,
    //   variation: "2", // override a few fields
    //   owner_name_input: "CRP2",
    //   owner_mobile: "9833033332",
    //   locaity_details_flat_num: "CRP2 F2 Wing 2",
    //   locaity_details_building_name: "CRP2 Building 2",
    //   locaity_details_landmark: "CRP2 Landmark 2",
    //   final_details_screenshot: "final_details_commercial_rent_property_2",
    //   final_details_top_header: ".*Building 2.*",
    //   final_details_owner_name: "CRP2",
    //   final_details_owner_mobile: "9833033332"
    // }
  ];
}

// Generate test cases from template
function generateYaml(templatePath, data, outputPath) {
  let templateContent = fs.readFileSync(templatePath, "utf8");

  for (const [key, value] of Object.entries(data)) {
    const regex = new RegExp(`\\$\\{${key}\\}`, "g");
    templateContent = templateContent.replace(regex, value);
  }

  fs.writeFileSync(outputPath, templateContent, "utf8");
  console.log(`✅ Generated test file: ${outputPath}`);
}

function main() {
  const templatePath = ".maestro/ios/template/property/template/add_residential_rent_property_template.yaml";

  const variations = createTestDataVariations(baseData);

  variations.forEach((data, index) => {
    const outputPath = `.maestro/ios/new_property/add_residential_rent_property_case${data.variation}.yaml`;
    generateYaml(templatePath, data, outputPath);
  });
}

main();
