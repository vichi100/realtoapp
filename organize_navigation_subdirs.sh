#!/bin/bash

# 1. Create directories
mkdir -p src/navigation/stacks
mkdir -p src/navigation/tabs
mkdir -p src/navigation/main

# 2. Move files
# Stacks
mv src/navigation/AddNewCustomerStack.js src/navigation/stacks/
mv src/navigation/AddNewPropertyStack.js src/navigation/stacks/
mv src/navigation/ContactsStack.js src/navigation/stacks/
mv src/navigation/GlobalSearchStackNav.js src/navigation/stacks/
mv src/navigation/HomeStackNav.js src/navigation/stacks/
mv src/navigation/ListingStack.js src/navigation/stacks/
mv src/navigation/LocalityDetailsNav.js src/navigation/stacks/
mv src/navigation/NotificationStack.js src/navigation/stacks/
mv src/navigation/ProfileStack.js src/navigation/stacks/

# Tabs
mv src/navigation/BottomTabScreen.js src/navigation/tabs/
mv src/navigation/ContactsTopTab.js src/navigation/tabs/
mv src/navigation/ListingTopTab.js src/navigation/tabs/
mv src/navigation/NotificationTopTab.js src/navigation/tabs/

# Main
mv src/navigation/MainScreen.js src/navigation/main/
mv src/navigation/MainStackNavigator.js src/navigation/main/

# 3. Update internal imports (upward references)
# All moved files are 1 level deeper, so ../ becomes ../../
# We need to be careful not to break imports that are now pointing to siblings in the new structure.
# But most imports are to screens, components, utils which are outside navigation.

# Update imports in stacks/
find src/navigation/stacks -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./screens|\.\./\.\./screens|g'
find src/navigation/stacks -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./components|\.\./\.\./components|g'
find src/navigation/stacks -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./utils|\.\./\.\./utils|g'
find src/navigation/stacks -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./assets|\.\./\.\./assets|g'
find src/navigation/stacks -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./config|\.\./\.\./config|g'
find src/navigation/stacks -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./store|\.\./\.\./store|g'
find src/navigation/stacks -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./reducers|\.\./\.\./reducers|g'

# Update imports in tabs/
find src/navigation/tabs -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./screens|\.\./\.\./screens|g'
find src/navigation/tabs -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./components|\.\./\.\./components|g'
find src/navigation/tabs -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./utils|\.\./\.\./utils|g'
find src/navigation/tabs -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./assets|\.\./\.\./assets|g'
find src/navigation/tabs -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./config|\.\./\.\./config|g'
find src/navigation/tabs -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./store|\.\./\.\./store|g'
find src/navigation/tabs -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./reducers|\.\./\.\./reducers|g'

# Update imports in main/
find src/navigation/main -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./screens|\.\./\.\./screens|g'
find src/navigation/main -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./components|\.\./\.\./components|g'
find src/navigation/main -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./utils|\.\./\.\./utils|g'
find src/navigation/main -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./assets|\.\./\.\./assets|g'
find src/navigation/main -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./config|\.\./\.\./config|g'
find src/navigation/main -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./store|\.\./\.\./store|g'
find src/navigation/main -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./reducers|\.\./\.\./reducers|g'

# 4. Update cross-navigation imports

# Files in tabs/ importing stacks/
# BottomTabScreen.js imports HomeStackNav, ListingStack, AddNewPropertyStack, ContactsStack, ProfileStack
# Old: import HomeStackNav from "./HomeStackNav";
# New: import HomeStackNav from "../stacks/HomeStackNav";

stacks_files=(
"AddNewCustomerStack"
"AddNewPropertyStack"
"ContactsStack"
"GlobalSearchStackNav"
"HomeStackNav"
"ListingStack"
"LocalityDetailsNav"
"NotificationStack"
"ProfileStack"
)

for file in "${stacks_files[@]}"; do
    # Update imports in tabs/
    find src/navigation/tabs -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|from \"\./$file\"|from \"../stacks/$file\"|g"
    # Update imports in main/
    find src/navigation/main -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|from \"\./$file\"|from \"../stacks/$file\"|g"
done

# Files in main/ importing tabs/
# MainStackNavigator.js imports BottomTabScreen
# Old: import BottomTabScreen from "./BottomTabScreen";
# New: import BottomTabScreen from "../tabs/BottomTabScreen";

tabs_files=(
"BottomTabScreen"
"ContactsTopTab"
"ListingTopTab"
"NotificationTopTab"
)

for file in "${tabs_files[@]}"; do
    # Update imports in main/
    find src/navigation/main -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|from \"\./$file\"|from \"../tabs/$file\"|g"
    # Update imports in stacks/ (if any)
    find src/navigation/stacks -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|from \"\./$file\"|from \"../tabs/$file\"|g"
done

# Files in main/ importing main/ (siblings)
# MainStackNavigator.js imports MainScreen? No, MainScreen is usually a screen, but here it's in navigation folder?
# Let's check MainStackNavigator.js content later. Assuming sibling imports are fine as "./File".

# 5. Update external imports
# App.js imports MainStackNavigator
# Old: import MainStackNavigator from "./src/navigation/MainStackNavigator";
# New: import MainStackNavigator from "./src/navigation/main/MainStackNavigator";

find . -maxdepth 2 -type f -name "App.js" -print0 | xargs -0 sed -i '' 's|src/navigation/MainStackNavigator|src/navigation/main/MainStackNavigator|g'

# Check for other external imports
# Any file importing from "navigation/File" needs update.

for file in "${stacks_files[@]}"; do
    find src -type f -not -path "src/navigation/*" -name "*.js" -print0 | xargs -0 sed -i '' "s|navigation/$file|navigation/stacks/$file|g"
done

for file in "${tabs_files[@]}"; do
    find src -type f -not -path "src/navigation/*" -name "*.js" -print0 | xargs -0 sed -i '' "s|navigation/$file|navigation/tabs/$file|g"
done

main_files=(
"MainScreen"
"MainStackNavigator"
)

for file in "${main_files[@]}"; do
    find src -type f -not -path "src/navigation/*" -name "*.js" -print0 | xargs -0 sed -i '' "s|navigation/$file|navigation/main/$file|g"
done

