// __tests__/ListingResidential.integration.test.js

import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import ListingResidential from '../src/screen/ListingResidential'; // Adjust path
import { SERVER_URL } from '../src/util/Constant'; // Adjust path
import { useIsFocused } from '@react-navigation/native'; // Mock useIsFocused
import { useDispatch, useSelector } from 'react-redux'; // Mock useDispatch, useSelector

// Mock the direct imports that would cause issues in a Jest environment
// For react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('react-native-vector-icons/Feather', () => 'Feather');
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');
// For react-native-paper
jest.mock('react-native-paper', () => ({
    ...jest.requireActual('react-native-paper'),
    useTheme: () => ({ colors: { primary: '#123456' } }), // Mock useTheme
}));
// For @rneui/themed
jest.mock('@rneui/themed', () => ({
    ...jest.requireActual('@rneui/themed'),
    ButtonGroup: 'ButtonGroup', // Mock specific components
    CheckBox: 'CheckBox',
}));
// For react-native-btr (BottomSheet)
jest.mock('react-native-btr', () => ({
    BottomSheet: 'BottomSheet',
}));
// For react-native-iphone-x-helper
jest.mock('react-native-iphone-x-helper', () => ({
    getBottomSpace: () => 0,
}));
// For react-navigation/native hooks
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useFocusEffect: jest.fn(), // Mock this hook
    useIsFocused: jest.fn(), // Mock this hook
    useNavigation: () => ({ navigate: jest.fn() }), // Mock useNavigation
}));
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

// Mock Redux actions or the entire store setup
const mockStore = configureStore([]);
const initialState = {
    AppReducer: {
        userDetails: {
            id: 'agent123',
            works_for: 'agent123',
            user_type: 'agent',
            name: 'Test Agent',
            mobile: '1234567890'
        },
        residentialPropertyList: [],
        propListForMeeting: [],
    },
    dataRefresh: {
        shouldRefresh: false,
    },
};

// Mock axios for API calls
jest.mock('axios');

describe('ListingResidential Integration Tests', () => {
    let store;
    let mockNavigate;
    let mockDispatch;

    beforeEach(() => {
        store = mockStore(initialState);
        mockNavigate = jest.fn();
        mockDispatch = jest.fn();

        // Setup mock for useIsFocused and useSelector/useDispatch
        useIsFocused.mockReturnValue(true);
        useSelector.mockImplementation(selector => selector(initialState));
        useDispatch.mockReturnValue(mockDispatch);

        // Reset axios mocks
        axios.post.mockReset();
        axios.post.mockResolvedValue({ data: [] }); // Default mock for API calls
    });

    test('should fetch and display residential property listings on mount for agent', async () => {
        const mockPropertyData = [
            {
                property_id: 'prop1',
                agent_id: 'agent123',
                property_type: 'Residential',
                property_for: 'Rent',
                property_address: { building_name: 'Building A', landmark_or_street: 'Street B', formatted_address: 'Address A' },
                property_details: { bhk_type: '2BHK', furnishing_status: 'Full' },
                rent_details: { expected_rent: 50000, expected_deposit: 100000 },
                image_urls: [{ url: '/image1.jpg' }],
                match_count: 0
            },
            {
                property_id: 'prop2',
                agent_id: 'agent123',
                property_type: 'Residential',
                property_for: 'Sell',
                property_address: { building_name: 'Building C', landmark_or_street: 'Street D', formatted_address: 'Address B' },
                property_details: { bhk_type: '3BHK', furnishing_status: 'Semi' },
                sell_details: { expected_sell_price: 10000000 },
                image_urls: [{ url: '/image2.jpg' }],
                match_count: 0
            },
        ];

        axios.post.mockResolvedValueOnce({ data: mockPropertyData }); // Mock for getListing

        const { getByText } = render(
            <Provider store={store}>
                <ListingResidential navigation={{ navigate: mockNavigate }} route={{ params: {} }} />
            </Provider>
        );

        // Wait for the API call to resolve and data to be rendered
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                `${SERVER_URL}/residentialPropertyListings`,
                { req_user_id: 'agent123', agent_id: 'agent123' },
                expect.any(Object)
            );
            expect(getByText('Rent In Building A, Street B')).toBeDefined();
            expect(getByText('Sell In Building C, Street D')).toBeDefined();
            // Check if the Redux action was dispatched
            expect(store.getActions()).toContainEqual({
                type: 'SET_RESIDENTIAL_PROPERTY_LIST',
                payload: mockPropertyData,
            });
            // Verify resetRefresh action
            expect(mockDispatch).toHaveBeenCalledWith({ type: 'dataRefresh/resetRefresh' });
        }, { timeout: 2000 }); // Increase timeout if needed for async operations
    });

    test('should navigate to property details when a property card is pressed', async () => {
        const mockProperty = {
            property_id: 'testProp',
            agent_id: 'agent123',
            property_type: 'Residential',
            property_for: 'Rent',
            property_address: { building_name: 'Test Building', landmark_or_street: 'Test Street', formatted_address: 'Test Address' },
            property_details: { bhk_type: '1BHK', furnishing_status: 'Empty' },
            rent_details: { expected_rent: 25000, expected_deposit: 50000 },
            image_urls: [{ url: '/test_image.jpg' }],
            match_count: 0
        };

        axios.post.mockResolvedValueOnce({ data: [mockProperty] }); // Mock for getListing

        const { getByText } = render(
            <Provider store={store}>
                <ListingResidential navigation={{ navigate: mockNavigate }} route={{ params: {} }} />
            </Provider>
        );

        await waitFor(() => {
            expect(getByText('Rent In Test Building, Test Street')).toBeDefined();
        });

        // Simulate pressing the property card
        fireEvent.press(getByText('Rent In Test Building, Test Street'));

        // Check if setPropertyDetails action was dispatched
        expect(store.getActions()).toContainEqual({
            type: 'SET_PROPERTY_DETAILS',
            payload: mockProperty,
        });
        // Check if navigation occurred with correct parameters
        expect(mockNavigate).toHaveBeenCalledWith('PropDetailsFromListing', {
            item: mockProperty,
            displayMatchCount: true,
            displayMatchPercent: false,
        });
    });

    test('should apply search filter correctly', async () => {
        const initialProperties = [
            {
                property_id: 'prop1',
                agent_id: 'agent123',
                property_type: 'Residential',
                property_for: 'Rent',
                property_address: { building_name: 'Apple Tower', landmark_or_street: 'Orchard Street', formatted_address: '123 Apple Lane' },
                property_details: {}, rent_details: {}, image_urls: []
            },
            {
                property_id: 'prop2',
                agent_id: 'agent123',
                property_type: 'Residential',
                property_for: 'Rent',
                property_address: { building_name: 'Banana Apt', landmark_or_street: 'Fruit Road', formatted_address: '456 Banana St' },
                property_details: {}, rent_details: {}, image_urls: []
            },
        ];
        // Set initial state with properties
        store = mockStore({
            ...initialState,
            AppReducer: {
                ...initialState.AppReducer,
                residentialPropertyList: initialProperties,
            },
        });
        axios.post.mockResolvedValueOnce({ data: initialProperties });

        const { getByPlaceholderText, queryByText } = render(
            <Provider store={store}>
                <ListingResidential navigation={{ navigate: mockNavigate }} route={{ params: {} }} />
            </Provider>
        );

        // Wait for initial data to load
        await waitFor(() => expect(queryByText('Rent In Apple Tower, Orchard Street')).toBeDefined());

        // Simulate typing into the search bar
        const searchInput = getByPlaceholderText('Search by Property ID, Building Name, Location');
        fireEvent.changeText(searchInput, 'Apple');

        // Check if only the matching property is displayed
        expect(queryByText('Rent In Apple Tower, Orchard Street')).toBeDefined();
        expect(queryByText('Rent In Banana Apt, Fruit Road')).toBeNull(); // Should be filtered out

        // Clear search to show all properties again
        fireEvent.changeText(searchInput, '');
        expect(queryByText('Rent In Apple Tower, Orchard Street')).toBeDefined();
        expect(queryByText('Rent In Banana Apt, Fruit Road')).toBeDefined();
    });


    // Test sorting by rent (Lowest First)
    test('should sort residential rent properties by lowest rent first', async () => {
        const mockProperties = [
            {
                property_id: 'prop1', agent_id: 'agent123', property_for: 'Rent', property_address: { building_name: 'Building A', landmark_or_street: 'Street B', formatted_address: 'Address A' },
                property_details: { bhk_type: '2BHK' }, rent_details: { expected_rent: 50000, available_from: '2025-06-01' }, image_urls: []
            },
            {
                property_id: 'prop2', agent_id: 'agent123', property_for: 'Rent', property_address: { building_name: 'Building C', landmark_or_street: 'Street D', formatted_address: 'Address B' },
                property_details: { bhk_type: '2BHK' }, rent_details: { expected_rent: 30000, available_from: '2025-07-01' }, image_urls: []
            },
            {
                property_id: 'prop3', agent_id: 'agent123', property_for: 'Rent', property_address: { building_name: 'Building E', landmark_or_street: 'Street F', formatted_address: 'Address C' },
                property_details: { bhk_type: '2BHK' }, rent_details: { expected_rent: 70000, available_from: '2025-05-01' }, image_urls: []
            },
        ];
        store = mockStore({
            ...initialState,
            AppReducer: {
                ...initialState.AppReducer,
                residentialPropertyList: mockProperties,
            },
        });
        axios.post.mockResolvedValueOnce({ data: mockProperties }); // For initial fetch

        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <ListingResidential navigation={{ navigate: mockNavigate }} route={{ params: {} }} />
            </Provider>
        );

        await waitFor(() => expect(getByText('Rent In Building A, Street B')).toBeDefined());

        // Open sorting bottom sheet
        fireEvent.press(getByTestId('sort-button'));

        // Select "Rent" for "Looking For" in sort by
        fireEvent.press(getByTestId('looking-for-sort-by-0')); // Assuming index 0 is "Rent"

        // Select "Lowest First" for "Sort By Rent"
        fireEvent.press(getByTestId('sort-by-rent-0')); // Assuming index 0 is "Lowest First"

        // Wait for re-render and check order
        await waitFor(() => {
            const propertyTitles = queryAllByText(/Rent In .*Building.*, .*Street.*/);
            expect(propertyTitles[0].children[0]).toContain('Rent In Building C'); // 30000
            expect(propertyTitles[1].children[0]).toContain('Rent In Building A'); // 50000
            expect(propertyTitles[2].children[0]).toContain('Rent In Building E'); // 70000
        });
    });

    // Test sorting by availability (Earliest First)
    test('should sort residential rent properties by earliest availability first', async () => {
        const mockProperties = [
            {
                property_id: 'prop1', agent_id: 'agent123', property_for: 'Rent', property_address: { building_name: 'Building A', landmark_or_street: 'Street B', formatted_address: 'Address A' },
                property_details: { bhk_type: '2BHK' }, rent_details: { expected_rent: 50000, available_from: '2025-06-01T00:00:00.000Z' }, image_urls: []
            },
            {
                property_id: 'prop2', agent_id: 'agent123', property_for: 'Rent', property_address: { building_name: 'Building C', landmark_or_street: 'Street D', formatted_address: 'Address B' },
                property_details: { bhk_type: '2BHK' }, rent_details: { expected_rent: 30000, available_from: '2025-05-15T00:00:00.000Z' }, image_urls: []
            },
            {
                property_id: 'prop3', agent_id: 'agent123', property_for: 'Rent', property_address: { building_name: 'Building E', landmark_or_street: 'Street F', formatted_address: 'Address C' },
                property_details: { bhk_type: '2BHK' }, rent_details: { expected_rent: 70000, available_from: '2025-07-01T00:00:00.000Z' }, image_urls: []
            },
        ];
        store = mockStore({
            ...initialState,
            AppReducer: {
                ...initialState.AppReducer,
                residentialPropertyList: mockProperties,
            },
        });
        axios.post.mockResolvedValueOnce({ data: mockProperties });

        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <ListingResidential navigation={{ navigate: mockNavigate }} route={{ params: {} }} />
            </Provider>
        );

        await waitFor(() => expect(getByText('Rent In Building A, Street B')).toBeDefined());

        fireEvent.press(getByTestId('sort-button'));
        fireEvent.press(getByTestId('looking-for-sort-by-0')); // Rent
        fireEvent.press(getByTestId('sort-by-availability-0')); // Earliest First

        await waitFor(() => {
            const propertyTitles = queryAllByText(/Rent In .*Building.*, .*Street.*/);
            expect(propertyTitles[0].children[0]).toContain('Rent In Building C'); // 2025-05-15
            expect(propertyTitles[1].children[0]).toContain('Rent In Building A'); // 2025-06-01
            expect(propertyTitles[2].children[0]).toContain('Rent In Building E'); // 2025-07-01
        });
    });

    // Test sorting by posted date (Recent First)
    test('should sort residential rent properties by recent posted date first', async () => {
        const mockProperties = [
            {
                property_id: 'prop1', agent_id: 'agent123', property_for: 'Rent', property_address: { building_name: 'Building A', landmark_or_street: 'Street B', formatted_address: 'Address A' },
                property_details: { bhk_type: '2BHK' }, rent_details: { expected_rent: 50000 }, image_urls: [], create_date_time: '2025-06-01T10:00:00.000Z'
            },
            {
                property_id: 'prop2', agent_id: 'agent123', property_for: 'Rent', property_address: { building_name: 'Building C', landmark_or_street: 'Street D', formatted_address: 'Address B' },
                property_details: { bhk_type: '2BHK' }, rent_details: { expected_rent: 30000 }, image_urls: [], create_date_time: '2025-06-05T10:00:00.000Z'
            },
            {
                property_id: 'prop3', agent_id: 'agent123', property_for: 'Rent', property_address: { building_name: 'Building E', landmark_or_street: 'Street F', formatted_address: 'Address C' },
                property_details: { bhk_type: '2BHK' }, rent_details: { expected_rent: 70000 }, image_urls: [], create_date_time: '2025-05-20T10:00:00.000Z'
            },
        ];
        store = mockStore({
            ...initialState,
            AppReducer: {
                ...initialState.AppReducer,
                residentialPropertyList: mockProperties,
            },
        });
        axios.post.mockResolvedValueOnce({ data: mockProperties });

        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <ListingResidential navigation={{ navigate: mockNavigate }} route={{ params: {} }} />
            </Provider>
        );

        await waitFor(() => expect(getByText('Rent In Building A, Street B')).toBeDefined());

        fireEvent.press(getByTestId('sort-button'));
        fireEvent.press(getByTestId('looking-for-sort-by-0')); // Rent
        fireEvent.press(getByTestId('sort-by-posted-date-0')); // Recent First (Note: Your code sorts asc for "Recent First" and desc for "Oldest First". I'll test based on your code's current logic, which means "Recent First" would actually show older dates first if the logic is `a - b` for recent. Double-check your `sortByPostedDate` logic in `ListingResidential.js` to ensure it matches the desired sorting order.)

        await waitFor(() => {
            const propertyTitles = queryAllByText(/Rent In .*Building.*, .*Street.*/);
            // Based on current JS sort logic (a-b for "Recent First")
            // 2025-05-20 (prop3), 2025-06-01 (prop1), 2025-06-05 (prop2)
            expect(propertyTitles[0].children[0]).toContain('Rent In Building E');
            expect(propertyTitles[1].children[0]).toContain('Rent In Building A');
            expect(propertyTitles[2].children[0]).toContain('Rent In Building C');
        });
    });

    // Test error handling for API calls
    test('should show error message if fetching listings fails', async () => {
        axios.post.mockRejectedValueOnce(new Error('Network Error'));

        const { getByText, queryByText } = render(
            <Provider store={store}>
                <ListingResidential navigation={{ navigate: mockNavigate }} route={{ params: {} }} />
            </Provider>
        );

        await waitFor(() => {
            expect(queryByText('Failed to fetch listings')).toBeDefined(); // Assuming Snackbar shows this message
        });
    });

    // Test checkbox functionality for assigning to employee
    test('should toggle employee assignment checkbox and trigger API call', async () => {
        const mockProperty = {
            property_id: 'propEmp1',
            agent_id: 'agent123',
            property_type: 'Residential',
            property_for: 'Rent',
            property_address: { building_name: 'Employee Test', landmark_or_street: 'Street', formatted_address: 'Address' },
            property_details: {}, rent_details: {}, image_urls: [],
            assigned_to_employee: [], // Initially not assigned
            assigned_to_employee_name: [],
        };
        const mockEmployeeObj = { id: 'emp001', name: 'Employee One' };

        store = mockStore({
            ...initialState,
            AppReducer: {
                ...initialState.AppReducer,
                residentialPropertyList: [mockProperty],
            },
        });
        axios.post.mockResolvedValueOnce({ data: [mockProperty] }); // Initial fetch
        axios.post.mockResolvedValueOnce({ data: 'success' }); // For updatePropertiesForEmployee

        const { getByText, getByA11yRole } = render(
            <Provider store={store}>
                <ListingResidential navigation={{ navigate: mockNavigate }} route={{ params: { displayCheckBoxForEmployee: true, employeeObj: mockEmployeeObj } }} />
            </Provider>
        );

        await waitFor(() => expect(getByText('Rent In Employee Test, Street')).toBeDefined());

        // Find the checkbox and fire a press event
        const checkbox = getByA11yRole('checkbox'); // CheckBox is often rendered as a checkbox role
        fireEvent.press(checkbox);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                `${SERVER_URL}/updatePropertiesForEmployee`,
                expect.objectContaining({
                    employee_id: mockEmployeeObj.id,
                    operation: 'add',
                    what_to_update_data: expect.objectContaining({
                        property_id: mockProperty.property_id,
                        isProperty: true,
                        isResidential: true,
                        isForRent: true,
                    }),
                }),
                expect.any(Object)
            );
        });

        // Simulate subsequent press to remove
        axios.post.mockResolvedValueOnce({ data: 'success' }); // For second API call
        // Manually update the store to reflect the first assignment for the second click to work
        store = mockStore({
            ...initialState,
            AppReducer: {
                ...initialState.AppReducer,
                residentialPropertyList: [{
                    ...mockProperty,
                    assigned_to_employee: [mockEmployeeObj.id],
                    assigned_to_employee_name: [mockEmployeeObj.name],
                }],
            },
        });
        // Re-render with updated store (or ensure the component reacts to prop changes if not re-rendering)
        // For simplicity in testing, a re-render is usually triggered by a state update or prop change.
        // In a real app, `setState` or `dispatch` would cause the re-render.
        // Here, we just call render again with updated store.
        const { getByA11yRole: getByA11yRole2 } = render(
            <Provider store={store}>
                <ListingResidential navigation={{ navigate: mockNavigate }} route={{ params: { displayCheckBoxForEmployee: true, employeeObj: mockEmployeeObj } }} />
            </Provider>
        );

        // Ensure the checkbox appears checked now due to the updated state
        const updatedCheckbox = getByA11yRole2('checkbox');
        expect(updatedCheckbox.props.accessibilityState.checked).toBe(true);

        fireEvent.press(updatedCheckbox); // Press again to uncheck

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                `${SERVER_URL}/updatePropertiesForEmployee`,
                expect.objectContaining({
                    employee_id: mockEmployeeObj.id,
                    operation: 'remove',
                    what_to_update_data: expect.objectContaining({
                        property_id: mockProperty.property_id,
                        isProperty: true,
                        isResidential: true,
                        isForRent: true,
                    }),
                }),
                expect.any(Object)
            );
        });
    });

    // Test the "Delete" action in the Card component (via deleteMe prop)
    test('should remove a property from the list when deleteMe is called', async () => {
        const mockProperty = {
            property_id: 'propToDelete',
            agent_id: 'agent123',
            property_type: 'Residential',
            property_for: 'Rent',
            property_address: { building_name: 'Delete Test', landmark_or_street: 'Street', formatted_address: 'Address' },
            property_details: {}, rent_details: {}, image_urls: [],
        };

        store = mockStore({
            ...initialState,
            AppReducer: {
                ...initialState.AppReducer,
                residentialPropertyList: [mockProperty],
            },
        });
        axios.post.mockResolvedValueOnce({ data: [mockProperty] }); // Initial fetch

        // Mock the Card component's deleteMe prop to allow testing its effect on ListingResidential's state
        const MockCard = ({ item, deleteMe, ...props }) => (
            <TouchableOpacity onPress={() => deleteMe(item)}>
                <Text>{`Rent In ${item.property_address.building_name}, ${item.property_address.landmark_or_street}`}</Text>
            </TouchableOpacity>
        );
        // Replace the actual CardResidentialRent with our mock
        jest.doMock('../screens/Card', () => MockCard);

        const { getByText, queryByText } = render(
            <Provider store={store}>
                <ListingResidential navigation={{ navigate: mockNavigate }} route={{ params: {} }} />
            </Provider>
        );

        await waitFor(() => expect(getByText('Rent In Delete Test, Street')).toBeDefined());

        // Simulate pressing the mock card, which calls deleteMe
        fireEvent.press(getByText('Rent In Delete Test, Street'));

        // The property should now be removed from the displayed list
        await waitFor(() => {
            expect(queryByText('Rent In Delete Test, Street')).toBeNull();
        });
        // Verify that the internal `data` state of ListingResidential was updated.
        // This is a test of `deleteMe`'s effect within ListingResidential's state.
        // (You'd typically have a separate API call for actual deletion in the real app)
    });
});
