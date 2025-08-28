module.exports = function loginTests() {
    // e2e/add_residential_rent.test.js
    describe('Add Residential Rent Property Flow', () => {
        beforeAll(async () => {
            await device.launchApp({ newInstance: false });
        });

        it('should add a residential rent property successfully', async () => {
            // Navigate to Properties tab
            await element(by.label('bottom_tab_properties_icon')).tap();
            // await expect(
            //     element(by.text(/.*residential( properties)?s?.*/i))
            // ).toBeVisible();
            await expect(
                element(by.text(/residential property/i)).atIndex(0)
            ).toBeVisible();

            // Start add property flow
            await element(by.label('add_property_icon')).tap();
            await element(by.label('property_type_residential')).tap();
            await element(by.label('property_for_rent')).tap();
            await expect(element(by.text('Owner Details'))).toBeVisible();

            // Owner details
            await element(by.id('ownerNameInput')).tap();
            await element(by.id('ownerNameInput')).typeText('RRP1');
            await device.pressBack();

            await element(by.id('ownerMobileInput')).tap();
            await element(by.id('ownerMobileInput')).typeText('9833011111');
            await element(by.label('Done')).atIndex(0).tap();

            await element(by.id('ownerAddressInput')).tap();
            await element(by.id('ownerAddressInput')).typeText('juhu mumbai');
            await element(by.id('ownerAddressInput')).tapReturnKey();
            // await element(by.text('return')).tap();
            await element(by.text('NEXT')).tap();

            // Locality details
            await expect(element(by.text('Locality Details'))).toBeVisible();
            await element(by.id('cityInput')).tap();
            await element(by.id('cityInput')).atIndex(0).typeText('Mumbai');
            await element(by.id('GooglePlacesInput')).tap();
            await element(by.id('GooglePlacesInput')).typeText('Juhu');
            await element(by.text('Juhu Beach, Maharashtra')).tap();
            await element(by.id('flatNumberInput')).tap();
            await element(by.id('flatNumberInput')).typeText('RRP1 F1 Wing 1');
            await element(by.id('buildingNameInput')).tap();
            await element(by.id('buildingNameInput')).typeText('RRP1 Building 1');
            await element(by.id('landmarkInput')).tap();
            await element(by.id('landmarkInput')).typeText('RRP1 Landmark 1');
            await element(by.id('landmarkInput')).tapReturnKey();
            await element(by.text('NEXT')).tap();

            // Property details
            await expect(element(by.text('House Type*'))).toBeVisible();
            await element(by.label('house_type_apartment')).tap();
            await element(by.label('bhk_type_2bhk')).atIndex(0).tap();
            await element(by.label('washroom_number_2')).tap();
            await element(by.label('furnishing_status_semi')).tap();
            await element(by.label('parking_number_2')).tap();
            await element(by.label('parking_type_car')).tap();
            await element(by.id('scrollView')).scrollTo('bottom');
            await element(by.label('property_age_6-10')).tap();
            await element(by.id('floorInput')).tap();
            await element(by.id('floorInput')).typeText('20');
            await element(by.id('floorInput')).tapReturnKey();
            await element(by.id('totalFloorInput')).tap();
            await element(by.id('totalFloorInput')).typeText('25');
            await element(by.id('totalFloorInput')).tapReturnKey();
            await element(by.id('scrollView')).scrollTo('bottom');
            await element(by.label('lift_available_yes')).tap();
            await element(by.id('propertySizeInput')).tap();
            await element(by.id('propertySizeInput')).typeText('500');
            await element(by.id('propertySizeInput')).tapReturnKey();
            await element(by.id('scrollView')).scrollTo('bottom');
            await element(by.text('NEXT')).tap();

            // Rent details
            await expect(element(by.text('Rent Details'))).toBeVisible();
            await element(by.id('expectedRent')).tap();
            await element(by.id('expectedRent')).typeText('30000');
            await element(by.id('expectedDeposit')).tap();
            await element(by.id('expectedDeposit')).typeText('150000');
            await element(by.id('availableFrom')).tap();
            // await element(by.text(' 30 ')).tap();
            // await element(by.text('OK')).tap();
            await element(by.text(' 30 ')).atIndex(0).tap();
            // await element(by.text('OK')).atIndex(0).tap();
            await element(by.label('OK')).atIndex(1).tap();
            await element(by.text('NEXT')).tap();

            // Add images
            await expect(element(by.text('Add Images'))).toBeVisible();
            await element(by.text('ADD PHOTOS')).tap();
            // await element(by.label('Allow Full Access')).tap();
            // await element(by.text('Photo, 31 March 2018, 12:44 AM')).tap();
            // await element(by.type('UICollectionViewCell')).atIndex(0).tap();
            await waitFor(element(by.type('UICollectionViewCell'))).toBeVisible().withTimeout(5000);
            await element(by.type('UICollectionViewCell')).atIndex(0).tap();
            await element(by.text('NEXT')).tap();

            // Final details
            await expect(element(by.text('Final Details'))).toBeVisible();
            await device.takeScreenshot('final_details_residential_rent_property_1');
            await expect(element(by.text('RRP1 Building 1'))).toBeVisible();
            await expect(element(by.text('Juhu'))).toBeVisible();
            await expect(element(by.text('20/25'))).toBeVisible();
            await expect(element(by.text('6-10'))).toBeVisible();
            await expect(element(by.text('Semi'))).toBeVisible();
            await expect(element(by.text('Owner'))).toBeVisible();

            // Save
            await element(by.text('ADD')).tap();
            await expect(element(by.text('Residential'))).toBeVisible();
        });
    });

}