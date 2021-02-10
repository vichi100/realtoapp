const Stack = createStackNavigator();

import PostNewProperty from "../screens/upload/PostNewProperty";

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PostNewProperty"
          component={PostNewProperty}
          options={{ title: "Post New Property" }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: "Detail Screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
