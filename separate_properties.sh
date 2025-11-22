#!/bin/bash

# Create residential directory
mkdir -p src/screens/property/residential

# Move Residential Files
mv src/screens/property/AddNewPropFinalDetails.js src/screens/property/residential/
mv src/screens/property/AddNewPropSellFinalDetails.js src/screens/property/residential/
mv src/screens/property/Card.js src/screens/property/residential/
mv src/screens/property/CardSell.js src/screens/property/residential/
mv src/screens/property/ListingResidential.js src/screens/property/residential/
mv src/screens/property/PropDetailsFromListing.js src/screens/property/residential/
mv src/screens/property/PropDetailsFromListingForSell.js src/screens/property/residential/
mv src/screens/property/RentDetailsForm.js src/screens/property/residential/
mv src/screens/property/ResidentialPropertyDetailsForm.js src/screens/property/residential/
mv src/screens/property/SellDetailsForm.js src/screens/property/residential/

# Move Commercial Files
mv src/screens/property/AddNewPropCommercialRentFinalDetails.js src/screens/property/commercial/
mv src/screens/property/AddNewPropCommercialSellFinalDetails.js src/screens/property/commercial/
mv src/screens/property/CommercialPropertyDetailsForm.js src/screens/property/commercial/
mv src/screens/property/ListingCommercial.js src/screens/property/commercial/

# Update upward imports in moved files (residential)
# ../../utils -> ../../../utils
find src/screens/property/residential -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./utils|\.\./\.\./\.\./utils|g'
find src/screens/property/residential -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./components|\.\./\.\./\.\./components|g'
find src/screens/property/residential -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./navigation|\.\./\.\./\.\./navigation|g'
find src/screens/property/residential -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./assets|\.\./\.\./\.\./assets|g'
find src/screens/property/residential -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./config|\.\./\.\./\.\./config|g'
find src/screens/property/residential -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./store|\.\./\.\./\.\./store|g'

# Update upward imports in moved files (commercial) - ONLY the ones we just moved
# The ones we just moved are in the root of src/screens/property/commercial
find src/screens/property/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./utils|\.\./\.\./\.\./utils|g'
find src/screens/property/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./components|\.\./\.\./\.\./components|g'
find src/screens/property/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./navigation|\.\./\.\./\.\./navigation|g'
find src/screens/property/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./assets|\.\./\.\./\.\./assets|g'
find src/screens/property/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./config|\.\./\.\./\.\./config|g'
find src/screens/property/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./store|\.\./\.\./\.\./store|g'

# Update external references to these files
files_res=(
"AddNewPropFinalDetails"
"AddNewPropSellFinalDetails"
"Card"
"CardSell"
"ListingResidential"
"PropDetailsFromListing"
"PropDetailsFromListingForSell"
"RentDetailsForm"
"ResidentialPropertyDetailsForm"
"SellDetailsForm"
)

for file in "${files_res[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|property/$file|property/residential/$file|g"
done

files_com=(
"AddNewPropCommercialRentFinalDetails"
"AddNewPropCommercialSellFinalDetails"
"CommercialPropertyDetailsForm"
"ListingCommercial"
)

for file in "${files_com[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|property/$file|property/commercial/$file|g"
done

# Update references to shared files from within residential/commercial
shared_files=(
"AddImages"
"AddNewProperty"
"CloseProperty"
"LocalityDetailsForm"
"MatchedProperties"
"PropertyReminder"
)

for file in "${shared_files[@]}"; do
    # Replace ./File with ../File in residential
    find src/screens/property/residential -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$file'|g"
    # Replace ./File with ../File in commercial (root only)
    find src/screens/property/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$file'|g"
done
