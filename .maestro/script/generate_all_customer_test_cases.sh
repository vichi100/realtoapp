#!/bin/bash

# Function to run a test case generator
run_generator() {
  local script_name=$1
  echo "Running $script_name..."
  if node "$script_name"; then
    echo "$script_name completed successfully"
  else
    echo "Error running $script_name" >&2
    exit 1
  fi
}

# Main execution
echo "Starting customer test case generation..."


# Run all generators
run_generator "../generate/customer/generate_residential_rent_customer_test_yaml.js"
run_generator "../generate/customer/generate_residential_buy_customer_test_yaml.js"
run_generator "../generate/customer/generate_commercial_rent_customer_test_yaml.js"
run_generator "../generate/customer/generate_commercial_buy_customer_test_yaml.js"

echo "All customer test cases generated successfully!"


# Make it executable: chmod +x generate_all_property_test_cases.sh
# Run it: ./generate_all_property_test_cases.sh

