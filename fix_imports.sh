#!/bin/bash

# Fix CardSell imports (incorrectly moved to rent path in imports)
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|residential/rent/CardSell|residential/sell/CardSell|g'

# Fix PropDetailsFromListingForSell imports (incorrectly moved to rent path in imports)
find src -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|residential/rent/PropDetailsFromListingForSell|residential/sell/PropDetailsFromListingForSell|g'
