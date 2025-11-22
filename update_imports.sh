#!/bin/bash

# Helper function to update imports
# $1: Filename (without extension)
# $2: New Category
update_import() {
    local file=$1
    local category=$2
    
    # Update navigation imports (../screens/File)
    find src/navigation -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|/screens/$file|/screens/$category/$file|g"
    
    # Update imports from other screens using ../File (e.g. from commercial/rent)
    find src/screens -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|\.\./$file|\.\./$category/$file|g"
    
    # Update imports from other screens using ./File (siblings)
    # This is tricky. We want to replace ./File with ../category/File ONLY if the file is NOT in the same category.
    # But simpler approach: Replace ./File with ../category/File everywhere, then fix the self-references?
    # No, that breaks imports in the same file.
    
    # Better: Replace ./File with ../category/File in ALL files in src/screens
    # Then revert for files IN the category.
    
    find src/screens -type f -name "*.js" -print0 | xargs -0 sed -i '' "s|['\"]\\./$file['\"]|'../$category/$file'|g"
    
    # Revert for files in the same category (they should use ./File or just File)
    # Actually, if I changed it to ../category/File, it works even in the same category!
    # ../category/File from src/screens/category/Other.js -> src/screens/category/../category/File -> src/screens/category/File.
    # So ../category/File is VALID even for siblings!
    # So I can just universally replace ./File with ../category/File.
}

# Dashboard
update_import "Home" "dashboard"
update_import "Dashboard" "dashboard"

# Profile
update_import "Profile" "profile"
update_import "ProfileForm" "profile"

# Messages
update_import "Message" "messages"
update_import "MessageDetails" "messages"

# Notification
update_import "Notification" "notification"

# Meeting
update_import "Meeting" "meeting"
update_import "CustomerListForMeeting" "meeting"

# Employee
update_import "EmployeeAccess" "employee"
update_import "ManageEmployee" "employee"

# Common
update_import "Counter" "common"
update_import "Filter" "common"
update_import "GooglePlacesAutocomplete" "common"
update_import "Reminder" "common"
update_import "CustomerReminder" "common"
update_import "generatePdf" "common"

# Property
update_import "AddImages" "property"
update_import "AddNewPropCommercialRentFinalDetails" "property"
update_import "AddNewPropCommercialSellFinalDetails" "property"
update_import "AddNewPropFinalDetails" "property"
update_import "AddNewPropSellFinalDetails" "property"
update_import "AddNewProperty" "property"
update_import "Card" "property"
update_import "CardSell" "property"
update_import "CloseProperty" "property"
update_import "CommercialPropertyDetailsForm" "property"
update_import "ListingCommercial" "property"
update_import "ListingResidential" "property"
update_import "LocalityDetailsForm" "property"
update_import "MatchedProperties" "property"
update_import "PropDetailsFromListing" "property"
update_import "PropDetailsFromListingForSell" "property"
update_import "PropertyReminder" "property"
update_import "RentDetailsForm" "property"
update_import "ResidentialPropertyDetailsForm" "property"
update_import "SellDetailsForm" "property"
