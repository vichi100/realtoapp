#!/bin/bash

# Create directories
mkdir -p src/screens/contacts/residential/rent
mkdir -p src/screens/contacts/residential/buy
mkdir -p src/screens/contacts/commercial/rent
mkdir -p src/screens/contacts/commercial/buy

# Move Residential Rent Files
mv src/screens/contacts/AddNewCustomerRentResidentialFinalDetails.js src/screens/contacts/residential/rent/
mv src/screens/contacts/ContactRentDetailsForm.js src/screens/contacts/residential/rent/
mv src/screens/contacts/ContactResidentialRentCard.js src/screens/contacts/residential/rent/
mv src/screens/contacts/CustomerDetailsResidentialRentFromList.js src/screens/contacts/residential/rent/

# Move Residential Buy Files
mv src/screens/contacts/AddNewCustomerBuyResidentialFinalDetails.js src/screens/contacts/residential/buy/
mv src/screens/contacts/ContactBuyResidentialDetailsForm.js src/screens/contacts/residential/buy/
mv src/screens/contacts/ContactResidentialSellCard.js src/screens/contacts/residential/buy/
mv src/screens/contacts/CustomerDetailsResidentialBuyFromList.js src/screens/contacts/residential/buy/

# Move Commercial Rent Files
mv src/screens/contacts/AddNewCustomerCommercialRentFinalDetails.js src/screens/contacts/commercial/rent/
mv src/screens/contacts/CustomerCommercialRentCard.js src/screens/contacts/commercial/rent/
mv src/screens/contacts/CustomerCommercialRentDetailsForm.js src/screens/contacts/commercial/rent/
mv src/screens/contacts/CustomerDetailsCommercialRentFromList.js src/screens/contacts/commercial/rent/

# Move Commercial Buy Files
mv src/screens/contacts/AddNewCustomerCommercialBuyFinalDetails.js src/screens/contacts/commercial/buy/
mv src/screens/contacts/CustomerCommercialBuyCard.js src/screens/contacts/commercial/buy/
mv src/screens/contacts/CustomerCommercialBuyDetailsForm.js src/screens/contacts/commercial/buy/
mv src/screens/contacts/CustomerDetailsCommercialBuyFromList.js src/screens/contacts/commercial/buy/

# Update upward imports in moved files (residential/rent)
find src/screens/contacts/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./utils|\.\./\.\./\.\./\.\./utils|g'
find src/screens/contacts/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./components|\.\./\.\./\.\./\.\./components|g'
find src/screens/contacts/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./navigation|\.\./\.\./\.\./\.\./navigation|g'
find src/screens/contacts/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./assets|\.\./\.\./\.\./\.\./assets|g'
find src/screens/contacts/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./config|\.\./\.\./\.\./\.\./config|g'
find src/screens/contacts/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./store|\.\./\.\./\.\./\.\./store|g'
find src/screens/contacts/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./reducers|\.\./\.\./\.\./\.\./reducers|g'

# Update upward imports in moved files (residential/buy)
find src/screens/contacts/residential/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./utils|\.\./\.\./\.\./\.\./utils|g'
find src/screens/contacts/residential/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./components|\.\./\.\./\.\./\.\./components|g'
find src/screens/contacts/residential/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./navigation|\.\./\.\./\.\./\.\./navigation|g'
find src/screens/contacts/residential/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./assets|\.\./\.\./\.\./\.\./assets|g'
find src/screens/contacts/residential/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./config|\.\./\.\./\.\./\.\./config|g'
find src/screens/contacts/residential/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./store|\.\./\.\./\.\./\.\./store|g'
find src/screens/contacts/residential/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./reducers|\.\./\.\./\.\./\.\./reducers|g'

# Update upward imports in moved files (commercial/rent)
find src/screens/contacts/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./utils|\.\./\.\./\.\./\.\./utils|g'
find src/screens/contacts/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./components|\.\./\.\./\.\./\.\./components|g'
find src/screens/contacts/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./navigation|\.\./\.\./\.\./\.\./navigation|g'
find src/screens/contacts/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./assets|\.\./\.\./\.\./\.\./assets|g'
find src/screens/contacts/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./config|\.\./\.\./\.\./\.\./config|g'
find src/screens/contacts/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./store|\.\./\.\./\.\./\.\./store|g'
find src/screens/contacts/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./reducers|\.\./\.\./\.\./\.\./reducers|g'

# Update upward imports in moved files (commercial/buy)
find src/screens/contacts/commercial/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./utils|\.\./\.\./\.\./\.\./utils|g'
find src/screens/contacts/commercial/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./components|\.\./\.\./\.\./\.\./components|g'
find src/screens/contacts/commercial/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./navigation|\.\./\.\./\.\./\.\./navigation|g'
find src/screens/contacts/commercial/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./assets|\.\./\.\./\.\./\.\./assets|g'
find src/screens/contacts/commercial/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./config|\.\./\.\./\.\./\.\./config|g'
find src/screens/contacts/commercial/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./store|\.\./\.\./\.\./\.\./store|g'
find src/screens/contacts/commercial/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./\.\./reducers|\.\./\.\./\.\./\.\./reducers|g'

# Update external references to these files
files_res_rent=(
"AddNewCustomerRentResidentialFinalDetails"
"ContactRentDetailsForm"
"ContactResidentialRentCard"
"CustomerDetailsResidentialRentFromList"
)

for file in "${files_res_rent[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|contacts/$file|contacts/residential/rent/$file|g"
done

files_res_buy=(
"AddNewCustomerBuyResidentialFinalDetails"
"ContactBuyResidentialDetailsForm"
"ContactResidentialSellCard"
"CustomerDetailsResidentialBuyFromList"
)

for file in "${files_res_buy[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|contacts/$file|contacts/residential/buy/$file|g"
done

files_com_rent=(
"AddNewCustomerCommercialRentFinalDetails"
"CustomerCommercialRentCard"
"CustomerCommercialRentDetailsForm"
"CustomerDetailsCommercialRentFromList"
)

for file in "${files_com_rent[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|contacts/$file|contacts/commercial/rent/$file|g"
done

files_com_buy=(
"AddNewCustomerCommercialBuyFinalDetails"
"CustomerCommercialBuyCard"
"CustomerCommercialBuyDetailsForm"
"CustomerDetailsCommercialBuyFromList"
)

for file in "${files_com_buy[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|contacts/$file|contacts/commercial/buy/$file|g"
done

# Update references to shared files from within moved files
# Shared files in contacts: ContactsResidential, CustomersCommercial, ContactResidentialPropertyDetailsForm, CustomerCommercialPropertyDetailsForm
# Also common files: AddNewCustomer, ContactLocalityDetailsForm, CustomerMeeting, CustomerMeetingDetails, MatchedCustomers, PropertyListForMeeting

shared_files=(
"ContactsResidential"
"CustomersCommercial"
"ContactResidentialPropertyDetailsForm"
"CustomerCommercialPropertyDetailsForm"
"AddNewCustomer"
"ContactLocalityDetailsForm"
"CustomerMeeting"
"CustomerMeetingDetails"
"MatchedCustomers"
"PropertyListForMeeting"
)

for file in "${shared_files[@]}"; do
    # Replace ./File with ../../../File in residential/rent, residential/buy, commercial/rent, commercial/buy
    # Wait, the depth is 3: src/screens/contacts/residential/rent -> ../../../contacts/File
    # No, if file is in src/screens/contacts, and we are in src/screens/contacts/residential/rent
    # Then ../../File refers to src/screens/contacts/File.
    
    find src/screens/contacts/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../../$file'|g"
    find src/screens/contacts/residential/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../../$file'|g"
    find src/screens/contacts/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../../$file'|g"
    find src/screens/contacts/commercial/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../../$file'|g"
done

# Also handle imports that were ../File (referring to sibling in contacts) which are now ../../File
# Actually, if they were ./File, they are now ../../File.
# If they were ../File (referring to parent of contacts, i.e. screens), they are now ../../../File.

# Let's check for ../screens imports which might be common.
# But first, let's fix the specific imports for shared files which might have been referenced as ./File

# Update imports for shared files which are now in residential/ or commercial/ but not rent/buy
# Actually, I didn't move shared files to residential/ or commercial/ intermediate folders.
# I moved everything directly to residential/rent, residential/buy etc.
# Wait, the plan said:
# Shared (in residential/): ContactsResidential.js, ContactResidentialPropertyDetailsForm.js
# Shared (in commercial/): CustomersCommercial.js, CustomerCommercialPropertyDetailsForm.js

# So I need to move these to intermediate folders first?
# The script above moves them? No, the script above ONLY moves to rent/buy.
# I missed moving the shared files to residential/ and commercial/ directories in the script above.

# Let's add moves for shared files to residential/ and commercial/
mkdir -p src/screens/contacts/residential
mkdir -p src/screens/contacts/commercial

mv src/screens/contacts/ContactsResidential.js src/screens/contacts/residential/
mv src/screens/contacts/ContactResidentialPropertyDetailsForm.js src/screens/contacts/residential/

mv src/screens/contacts/CustomersCommercial.js src/screens/contacts/commercial/
mv src/screens/contacts/CustomerCommercialPropertyDetailsForm.js src/screens/contacts/commercial/

# Now update imports for these shared files (depth 1)
find src/screens/contacts/residential -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./utils|\.\./\.\./\.\./utils|g'
find src/screens/contacts/residential -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./components|\.\./\.\./\.\./components|g'
find src/screens/contacts/residential -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./navigation|\.\./\.\./\.\./navigation|g'
find src/screens/contacts/residential -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./assets|\.\./\.\./\.\./assets|g'
find src/screens/contacts/residential -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./config|\.\./\.\./\.\./config|g'
find src/screens/contacts/residential -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./store|\.\./\.\./\.\./store|g'
find src/screens/contacts/residential -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./reducers|\.\./\.\./\.\./reducers|g'

find src/screens/contacts/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./utils|\.\./\.\./\.\./utils|g'
find src/screens/contacts/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./components|\.\./\.\./\.\./components|g'
find src/screens/contacts/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./navigation|\.\./\.\./\.\./navigation|g'
find src/screens/contacts/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./assets|\.\./\.\./\.\./assets|g'
find src/screens/contacts/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./config|\.\./\.\./\.\./config|g'
find src/screens/contacts/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./store|\.\./\.\./\.\./store|g'
find src/screens/contacts/commercial -maxdepth 1 -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|\.\./\.\./reducers|\.\./\.\./\.\./reducers|g'

# Update external references to these shared files
shared_res_files=(
"ContactsResidential"
"ContactResidentialPropertyDetailsForm"
)
for file in "${shared_res_files[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|contacts/$file|contacts/residential/$file|g"
done

shared_com_files=(
"CustomersCommercial"
"CustomerCommercialPropertyDetailsForm"
)
for file in "${shared_com_files[@]}"; do
    find src -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|contacts/$file|contacts/commercial/$file|g"
done

# Now update references FROM rent/buy files TO these shared files
# They are now ../File (since shared are in residential/, and rent/buy are in residential/rent/)
# Previously they were ./File (siblings)
# So replace ./File with ../File for these specific files

for file in "${shared_res_files[@]}"; do
    find src/screens/contacts/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$file'|g"
    find src/screens/contacts/residential/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$file'|g"
done

for file in "${shared_com_files[@]}"; do
    find src/screens/contacts/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$file'|g"
    find src/screens/contacts/commercial/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$file'|g"
done

# Update references FROM rent/buy files TO common files (still in contacts/)
# They are now ../../File
# Previously they were ./File
# This was handled in the first block for shared_files, but I need to make sure I didn't break it.
# The first block replaced ./File with ../../File for ALL shared files including those I just moved to intermediate folders.
# So for ContactsResidential etc, it replaced ./ContactsResidential with ../../ContactsResidential.
# BUT ContactsResidential is now at ../ContactsResidential.
# So I need to correct that.

for file in "${shared_res_files[@]}"; do
    find src/screens/contacts/residential/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\.\\./\\.\\./$file['\"]|'../$file'|g"
    find src/screens/contacts/residential/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\.\\./\\.\\./$file['\"]|'../$file'|g"
done

for file in "${shared_com_files[@]}"; do
    find src/screens/contacts/commercial/rent -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\.\\./\\.\\./$file['\"]|'../$file'|g"
    find src/screens/contacts/commercial/buy -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\.\\./\\.\\./$file['\"]|'../$file'|g"
done

