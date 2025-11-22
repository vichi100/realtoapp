#!/bin/bash

# Function to rename file and update imports
rename_and_update() {
    local old_path="$1"
    local new_path="$2"
    local old_name=$(basename "$old_path" .js)
    local new_name=$(basename "$new_path" .js)

    echo "Renaming $old_path to $new_path"
    mv "$old_path" "$new_path"

    echo "Updating imports from $old_name to $new_name"
    # Find all JS files and replace the import string
    # We look for the filename in the import path.
    # This is a simple replacement and might need refinement if filenames are substrings of others,
    # but given the specific names, it should be safe.
    
    # Replace exact filename in paths
    # e.g., .../OldName" -> .../NewName"
    # e.g., .../OldName'; -> .../NewName';
    
    find src -name "*.js" -print0 | xargs -0 sed -i '' "s|/$old_name\"|/$new_name\"|g"
    find src -name "*.js" -print0 | xargs -0 sed -i '' "s|/$old_name'|/$new_name'|g"
    
    # Also update App.js if it's outside src
    if [ -f "App.js" ]; then
        sed -i '' "s|/$old_name\"|/$new_name\"|g" "App.js"
        sed -i '' "s|/$old_name'|/$new_name'|g" "App.js"
    fi
}

# Stacks
rename_and_update "src/navigation/stacks/GlobalSearchStackNav.js" "src/navigation/stacks/GlobalSearchStack.js"
rename_and_update "src/navigation/stacks/HomeStackNav.js" "src/navigation/stacks/HomeStack.js"
rename_and_update "src/navigation/stacks/LocalityDetailsNav.js" "src/navigation/stacks/LocalityDetailsStack.js"
rename_and_update "src/navigation/stacks/AddNewCustomerStack.js" "src/navigation/stacks/AddCustomerStack.js"
rename_and_update "src/navigation/stacks/AddNewPropertyStack.js" "src/navigation/stacks/AddPropertyStack.js"

# Tabs
rename_and_update "src/navigation/tabs/BottomTabScreen.js" "src/navigation/tabs/BottomTabNavigator.js"
rename_and_update "src/navigation/tabs/ContactsTopTab.js" "src/navigation/tabs/ContactsTopTabNavigator.js"
rename_and_update "src/navigation/tabs/ListingTopTab.js" "src/navigation/tabs/ListingTopTabNavigator.js"
rename_and_update "src/navigation/tabs/NotificationTopTab.js" "src/navigation/tabs/NotificationTopTabNavigator.js"

# Main
rename_and_update "src/navigation/main/MainScreen.js" "src/navigation/main/AppNavigator.js"
rename_and_update "src/navigation/main/MainStackNavigator.js" "src/navigation/main/RootStackNavigator.js"

echo "Renaming complete."
