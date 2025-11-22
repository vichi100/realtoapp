#!/bin/bash

# Create directories
mkdir -p src/screens/property/residential/rent
mkdir -p src/screens/property/residential/sell
mkdir -p src/screens/property/commercial/rent
mkdir -p src/screens/property/commercial/sell

# Move Residential Rent Files
mv src/screens/property/residential/AddNewPropFinalDetails.js src/screens/property/residential/rent/
mv src/screens/property/residential/Card.js src/screens/property/residential/rent/
mv src/screens/property/residential/PropDetailsFromListing.js src/screens/property/residential/rent/
mv src/screens/property/residential/RentDetailsForm.js src/screens/property/residential/rent/

# Move Residential Sell Files
mv src/screens/property/residential/AddNewPropSellFinalDetails.js src/screens/property/residential/sell/
mv src/screens/property/residential/CardSell.js src/screens/property/residential/sell/
mv src/screens/property/residential/PropDetailsFromListingForSell.js src/screens/property/residential/sell/
mv src/screens/property/residential/SellDetailsForm.js src/screens/property/residential/sell/

# Move Commercial Rent Files
mv src/screens/property/commercial/AddNewPropCommercialRentFinalDetails.js src/screens/property/commercial/rent/

# Move Commercial Sell Files
mv src/screens/property/commercial/AddNewPropCommercialSellFinalDetails.js src/screens/property/commercial/sell/

# Update upward imports in moved files (residential/rent)
find src/screens/property/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./utils|\.\./\.\./\.\./\.\./utils|g'
find src/screens/property/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./components|\.\./\.\./\.\./\.\./components|g'
find src/screens/property/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./navigation|\.\./\.\./\.\./\.\./navigation|g'
find src/screens/property/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./assets|\.\./\.\./\.\./\.\./assets|g'
find src/screens/property/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./config|\.\./\.\./\.\./\.\./config|g'
find src/screens/property/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./store|\.\./\.\./\.\./\.\./store|g'

# Update upward imports in moved files (residential/sell)
find src/screens/property/residential/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./utils|\.\./\.\./\.\./\.\./utils|g'
find src/screens/property/residential/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./components|\.\./\.\./\.\./\.\./components|g'
find src/screens/property/residential/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./navigation|\.\./\.\./\.\./\.\./navigation|g'
find src/screens/property/residential/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./assets|\.\./\.\./\.\./\.\./assets|g'
find src/screens/property/residential/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./config|\.\./\.\./\.\./\.\./config|g'
find src/screens/property/residential/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./store|\.\./\.\./\.\./\.\./store|g'

# Update upward imports in moved files (commercial/rent)
find src/screens/property/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./utils|\.\./\.\./\.\./\.\./utils|g'
find src/screens/property/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./components|\.\./\.\./\.\./\.\./components|g'
find src/screens/property/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./navigation|\.\./\.\./\.\./\.\./navigation|g'
find src/screens/property/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./assets|\.\./\.\./\.\./\.\./assets|g'
find src/screens/property/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./config|\.\./\.\./\.\./\.\./config|g'
find src/screens/property/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./store|\.\./\.\./\.\./\.\./store|g'

# Update upward imports in moved files (commercial/sell)
find src/screens/property/commercial/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./utils|\.\./\.\./\.\./\.\./utils|g'
find src/screens/property/commercial/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./components|\.\./\.\./\.\./\.\./components|g'
find src/screens/property/commercial/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./navigation|\.\./\.\./\.\./\.\./navigation|g'
find src/screens/property/commercial/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./assets|\.\./\.\./\.\./\.\./assets|g'
find src/screens/property/commercial/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./config|\.\./\.\./\.\./\.\./config|g'
find src/screens/property/commercial/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./store|\.\./\.\./\.\./\.\./store|g'

# Update external references to these files
files_res_rent=(
"AddNewPropFinalDetails"
"Card"
"PropDetailsFromListing"
"RentDetailsForm"
)

for file in "${files_res_rent[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|residential/$file|residential/rent/$file|g"
done

files_res_sell=(
"AddNewPropSellFinalDetails"
"CardSell"
"PropDetailsFromListingForSell"
"SellDetailsForm"
)

for file in "${files_res_sell[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|residential/$file|residential/sell/$file|g"
done

files_com_rent=(
"AddNewPropCommercialRentFinalDetails"
)

for file in "${files_com_rent[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|commercial/$file|commercial/rent/$file|g"
done

files_com_sell=(
"AddNewPropCommercialSellFinalDetails"
)

for file in "${files_com_sell[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|commercial/$file|commercial/sell/$file|g"
done

# Update references to shared files from within moved files
# Shared files in residential: ListingResidential, ResidentialPropertyDetailsForm
# Shared files in commercial: ListingCommercial, CommercialPropertyDetailsForm

shared_res=(
"ListingResidential"
"ResidentialPropertyDetailsForm"
)

for file in "${shared_res[@]}"; do
    # Replace ./File with ../File in residential/rent and residential/sell
    find src/screens/property/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$file'|g"
    find src/screens/property/residential/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$file'|g"
done

shared_com=(
"ListingCommercial"
"CommercialPropertyDetailsForm"
)

for file in "${shared_com[@]}"; do
    # Replace ./File with ../File in commercial/rent and commercial/sell
    find src/screens/property/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$file'|g"
    find src/screens/property/commercial/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$file'|g"
done

# Also update references to other shared files (from previous step) that are now 2 levels up
# AddImages, AddNewProperty, CloseProperty, LocalityDetailsForm, MatchedProperties, PropertyReminder
# These are in src/screens/property
# From residential/rent (depth 2), they were ../File. Now they are ../../File.

shared_prop=(
"AddImages"
"AddNewProperty"
"CloseProperty"
"LocalityDetailsForm"
"MatchedProperties"
"PropertyReminder"
)

for file in "${shared_prop[@]}"; do
    find src/screens/property/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\.\\./$file['\"]|'../../$file'|g"
    find src/screens/property/residential/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\.\\./$file['\"]|'../../$file'|g"
    find src/screens/property/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\.\\./$file['\"]|'../../$file'|g"
    find src/screens/property/commercial/sell -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\.\\./$file['\"]|'../../$file'|g"
done
