# Required Test IDs and Accessibility Labels for Maestro Tests

To make the Maestro tests more reliable and maintainable, the following testIDs and accessibility labels need to be added to the React Native app components:

## Login Screen
- **Mobile Number Input**: Already has placeholder "Enter Mobile Number" ✅
- **Proceed/Submit Button**: Add `testID="proceed_button"` or `accessibilityLabel="Proceed"`
- **OTP Input**: Add label "Enter OTP" or `testID="otp_input"` ✅ (placeholder exists)

## Bottom Tab Navigation
- **Listing Tab**: Add `testID="tab_listing"` or `accessibilityLabel="Listing"`
- **Contact Tab**: Add `testID="tab_contact"` or `accessibilityLabel="Contact"`
- **Notifications Tab**: Add `testID="tab_notifications"` or `accessibilityLabel="Notifications"`
- **Profile Tab**: Add `testID="tab_profile"` or `accessibilityLabel="Profile"`

## Add Property Flow
- **Add Property Button** (+ button): Add `testID="add_property_button"` or `accessibilityLabel="Add Property"`
- **Residential Radio/Button**: Already has text "Residential" ✅
- **Commercial Radio/Button**: Already has text "Commercial" ✅
- **Rent Button**: Already has text "Rent" ✅
- **Sell Button**: Already has text "Sell" ✅
- **Next Buttons**: Already have text "NEXT" or "Next" ✅

## Property Details Forms
All text input fields should have proper labels (many already exist):
- City, Locality, Flat Number, Building Name ✅
- Floor, Total Floor, Property Size ✅
- Expected Rent, Expected Deposit, Available From ✅
- Owner Name, Owner Contact Number ✅

All button groups should have text labels (many already exist):
- Apartment, Villa, Independent House ✅
- 1RK, 1BHK, 2BHK, 3BHK, 4+BHK ✅
- Furnishing: Full, Semi, Empty ✅
- Parking: 1, 2, 3, 4, 4+ ✅
- Lift: Yes, No ✅

## Implementation Example (React Native)

```javascript
// For TouchableOpacity/Button components
<TouchableOpacity 
  testID="proceed_button"
  accessibilityLabel="Proceed to OTP"
  onPress={handleProceed}
>
  <Icon name="play" />
</TouchableOpacity>

// For Tab components
<Tab
  testID="tab_listing"
  accessibilityLabel="Listing"
  icon={ListingIcon}
/>

// For TextInput components (if not already present)
<TextInput
  placeholder="Enter Mobile Number"
  accessibilityLabel="Mobile Number Input"
  testID="mobile_input"
/>
```

## Priority
1. **High**: Login flow buttons (proceed, submit)
2. **High**: Tab navigation (all 4 tabs)
3. **Medium**: Add Property button
4. **Low**: All other buttons (most already have text labels)

## Benefits
- Tests become more reliable (won't break with UI layout changes)
- Better accessibility for screen readers
- Easier to maintain tests
- Industry best practice
