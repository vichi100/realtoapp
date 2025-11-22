#!/bin/bash

# 1. Delete unused file
rm src/navigation/AddNewPropertyStackNav.js

# 2. Rename files
mv src/navigation/AddNewCustomerStackScreens.js src/navigation/AddNewCustomerStack.js
mv src/navigation/AddNewPropStackScreens.js src/navigation/AddNewPropertyStack.js
mv src/navigation/ContactsStackScreens.js src/navigation/ContactsStack.js
mv src/navigation/ListingStackScreens.js src/navigation/ListingStack.js
mv src/navigation/NotificationStackScreens.js src/navigation/NotificationStack.js
mv src/navigation/ProfileStackScreens.js src/navigation/ProfileStack.js

# 3. Update imports
# AddNewCustomerStackScreens -> AddNewCustomerStack
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|AddNewCustomerStackScreens|AddNewCustomerStack|g'

# AddNewPropStackScreens -> AddNewPropertyStack
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|AddNewPropStackScreens|AddNewPropertyStack|g'

# ContactsStackScreens -> ContactsStack
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|ContactsStackScreens|ContactsStack|g'

# ListingStackScreens -> ListingStack
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|ListingStackScreens|ListingStack|g'

# NotificationStackScreens -> NotificationStack
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|NotificationStackScreens|NotificationStack|g'

# ProfileStackScreens -> ProfileStack
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|ProfileStackScreens|ProfileStack|g'
