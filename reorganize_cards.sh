#!/bin/bash

# 1. Delete unused directory
rm -rf src/screens/property/cards

# 2. Rename files
mv src/screens/property/residential/rent/Card.js src/screens/property/residential/rent/ResidentialRentCard.js
mv src/screens/property/residential/sell/CardSell.js src/screens/property/residential/sell/ResidentialSellCard.js
mv src/screens/property/commercial/rent/Card.js src/screens/property/commercial/rent/CommercialRentCard.js
mv src/screens/property/commercial/sell/Card.js src/screens/property/commercial/sell/CommercialSellCard.js

# 3. Update imports

# Residential Rent
# Replace 'residential/rent/Card' with 'residential/rent/ResidentialRentCard'
find src -name "*.js" -print0 | xargs -0 sed -i '' 's|residential/rent/Card|residential/rent/ResidentialRentCard|g'
# Also handle relative imports if any (e.g. inside residential folder)
# But grep showed mostly full paths or relative paths that include 'residential/rent/Card'
# Let's handle specific cases found in grep

# Residential Sell
find src -name "*.js" -print0 | xargs -0 sed -i '' 's|residential/sell/CardSell|residential/sell/ResidentialSellCard|g'

# Commercial Rent
find src -name "*.js" -print0 | xargs -0 sed -i '' 's|commercial/rent/Card|commercial/rent/CommercialRentCard|g'

# Commercial Sell
find src -name "*.js" -print0 | xargs -0 sed -i '' 's|commercial/sell/Card|commercial/sell/CommercialSellCard|g'

# Fix potentially broken imports in ListingCommercial.js and ListingResidential.js if they use ./commercial/... inside commercial folder
# Grep showed: import CardRent from "./commercial/rent/Card"; in ListingCommercial.js
# If ListingCommercial.js is in src/screens/property/commercial, this should be ./rent/CommercialRentCard
# Let's fix this specific pattern
find src/screens/property/commercial -name "ListingCommercial.js" -print0 | xargs -0 sed -i '' 's|\./commercial/rent/Card|\./rent/CommercialRentCard|g'
find src/screens/property/commercial -name "ListingCommercial.js" -print0 | xargs -0 sed -i '' 's|\./commercial/sell/Card|\./sell/CommercialSellCard|g'

# Also check ListingResidential.js
# Grep showed: import CardResidentialRent from '../property/residential/rent/Card';
# This is correct if ListingResidential is in src/screens/property/residential.
# But wait, grep showed: import CardResidentialRent from '../property/residential/rent/Card';
# If ListingResidential.js is in src/screens/property/residential, then ../property/residential/rent/Card resolves to src/screens/property/property/residential/rent/Card which is WRONG.
# It should be ./rent/Card or ../../property/residential/rent/Card (if it was moved deep).
# Actually, if ListingResidential.js is in src/screens/property/residential, then ../property means src/screens/property/property.
# It seems the previous move might have messed up relative imports if they weren't adjusted correctly.
# However, if the app was running, maybe I am mistaken about the path.
# Let's assume the grep output path is correct: src/screens/property/residential/ListingResidential.js
# And the import is: ../property/residential/rent/Card
# This is definitely wrong. It should be ./rent/Card or similar.
# I will fix these to be cleaner relative imports.

# Fix ListingResidential.js imports
sed -i '' 's|\.\./property/residential/rent/Card|\./rent/ResidentialRentCard|g' src/screens/property/residential/ListingResidential.js
sed -i '' 's|\.\./property/residential/sell/CardSell|\./sell/ResidentialSellCard|g' src/screens/property/residential/ListingResidential.js

# Fix ListingCommercial.js imports (if they were ../property/...)
sed -i '' 's|\.\./property/commercial/rent/Card|\./rent/CommercialRentCard|g' src/screens/property/commercial/ListingCommercial.js
sed -i '' 's|\.\./property/commercial/sell/Card|\./sell/CommercialSellCard|g' src/screens/property/commercial/ListingCommercial.js

# Also handle the case where I already replaced 'commercial/rent/Card' with 'commercial/rent/CommercialRentCard' globally above.
# So the sed above might have made it: import CardRent from "./commercial/rent/CommercialRentCard";
# I need to fix that to ./rent/CommercialRentCard

sed -i '' 's|\./commercial/rent/CommercialRentCard|\./rent/CommercialRentCard|g' src/screens/property/commercial/ListingCommercial.js
sed -i '' 's|\./commercial/sell/CommercialSellCard|\./sell/CommercialSellCard|g' src/screens/property/commercial/ListingCommercial.js

echo "Reorganization complete."
