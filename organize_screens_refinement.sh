#!/bin/bash

# 1. Cleanup unused files
rm src/screens/global/Temp.js
rm src/screens/global/Meeting.js

# 2. Rename global to search
mv src/screens/global src/screens/search

# 3. Move nonMatchCard to property/cards
mkdir -p src/screens/property/cards
mv src/screens/nonMatchCard/* src/screens/property/cards/
rmdir src/screens/nonMatchCard

# 4. Update imports for 'global' -> 'search'
# Search for imports containing 'screens/global' and replace with 'screens/search'
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|screens/global|screens/search|g'

# Also update relative imports if any files inside 'search' referred to themselves or siblings?
# Files inside 'search' (previously 'global') are:
# GlobalCommercialCustomersSearchResult.js
# GlobalCommercialPropertySearchResult.js
# GlobalResidentialContactsSearchResult.js
# GlobalResidentialPropertySearchResult.js
# GlobalSearch.js

# Check if they have internal relative imports.
# They are still in the same relative structure (just folder name changed), so sibling imports (./File) work fine.
# But upward imports (../) might need check if depth changed? No, depth is same: src/screens/global vs src/screens/search.

# 5. Update imports for 'nonMatchCard' -> 'property/cards'
# Old path: src/screens/nonMatchCard/File
# New path: src/screens/property/cards/File
# Search for 'screens/nonMatchCard' and replace with 'screens/property/cards'
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|screens/nonMatchCard|screens/property/cards|g'

# Also check for imports that might have been relative from other property screens.
# e.g. from src/screens/property/SomeFile.js importing '../nonMatchCard/File'
# This would now be './cards/File' or '../property/cards/File' depending on where it is.
# If it was '../nonMatchCard', it means it was in a sibling folder of nonMatchCard (i.e. src/screens/Something).
# If it was in src/screens/property, it would be '../nonMatchCard' (if property is sibling of nonMatchCard? No, property IS sibling of nonMatchCard).
# So 'screens/property/File' importing '../nonMatchCard/File' -> '../property/cards/File' (which is './cards/File' relative to property).

# Let's handle specific patterns:
# Pattern 1: "../nonMatchCard" -> "../property/cards" (generic safe replacement for siblings of nonMatchCard)
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./nonMatchCard|\.\./property/cards|g'

# Pattern 2: If any file inside src/screens/property was importing "../nonMatchCard", it is now "../property/cards".
# But since we are in src/screens/property, "../property/cards" is valid (goes up to screens, then down to property/cards).
# A cleaner path would be "./cards", but "../property/cards" works.

# 6. Update imports WITHIN the moved nonMatchCard files
# They were in src/screens/nonMatchCard (depth 3)
# Now in src/screens/property/cards (depth 4)
# So "../" becomes "../../"
# "../components" becomes "../../components" -> "../../../components"
# Let's update upward imports in the moved files.

find src/screens/property/cards -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./utils|\.\./\.\./\.\./utils|g'
find src/screens/property/cards -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./components|\.\./\.\./\.\./components|g'
find src/screens/property/cards -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./navigation|\.\./\.\./\.\./navigation|g'
find src/screens/property/cards -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./assets|\.\./\.\./\.\./assets|g'
find src/screens/property/cards -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./config|\.\./\.\./\.\./config|g'
find src/screens/property/cards -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./store|\.\./\.\./\.\./store|g'
find src/screens/property/cards -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./reducers|\.\./\.\./\.\./reducers|g'

