import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlaceDetails from "../screens/PlaceDetails";
import Favorite from "../screens/Favorite";

function MainStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="PlaceDetailsFav" component={PlaceDetails} />
    </Stack.Navigator>
  );
}

export default MainStack;
