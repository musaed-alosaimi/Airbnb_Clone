import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/SignIn";
import Home from "../screens/Home";
import SignUp from "../screens/SignUp";
import PlaceDetails from "../screens/PlaceDetails";

function MainStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerTitle: "Sign In Screen", headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitle: "Sign Up Screen", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
