#!/bin/bash

# Fix ContactsResidential.js imports
sed -i '' 's|import ContactResidentialRentCard from "./ContactResidentialRentCard"|import ContactResidentialRentCard from "./rent/ContactResidentialRentCard"|g' src/screens/contacts/residential/ContactsResidential.js
sed -i '' 's|import ContactResidentialSellCard from "./ContactResidentialSellCard"|import ContactResidentialSellCard from "./buy/ContactResidentialSellCard"|g' src/screens/contacts/residential/ContactsResidential.js

# Fix CustomersCommercial.js imports
sed -i '' 's|import CustomerCommercialRentCard from "./CustomerCommercialRentCard"|import CustomerCommercialRentCard from "./rent/CustomerCommercialRentCard"|g' src/screens/contacts/commercial/CustomersCommercial.js
sed -i '' 's|import CustomerCommercialBuyCard from "./CustomerCommercialBuyCard"|import CustomerCommercialBuyCard from "./buy/CustomerCommercialBuyCard"|g' src/screens/contacts/commercial/CustomersCommercial.js

# Fix CustomerListForMeeting.js imports (if any)
# It seems I saw "./contacts/..." in grep, which might be wrong if file is in meeting/
# Let's check if it needs ../contacts
# If it was "contacts/..." before, my script changed it to "contacts/residential/rent/..."
# If it was "./contacts/..." before, my script didn't touch the "./" part?
# My script: find src -type f ... | xargs sed ... "s|contacts/$file|contacts/residential/rent/$file|g"
# This replaces "contacts/File" with "contacts/residential/rent/File".
# If the original was "import ... from '../contacts/File'", it became "'../contacts/residential/rent/File'". Correct.
# If the original was "import ... from './contacts/File'" (which is weird if in meeting/), it became "'./contacts/residential/rent/File'".
# Let's assume it should be relative to src/screens/meeting, so ../contacts is correct.
# I will replace "./contacts/residential" with "../contacts/residential" in src/screens/meeting/

find src/screens/meeting -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|"\./contacts/residential|"../contacts/residential|g'
find src/screens/meeting -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|"\./contacts/commercial|"../contacts/commercial|g'

