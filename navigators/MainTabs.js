import React, { useState, createContext, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteStack from "../navigators/FavoriteStack";
import { Ionicons } from "@expo/vector-icons";
import MainStack from "../navigators/MainStack";
import MainTabsContext from "../Contexts/MainTabsContext";
import Profile from "../screens/Profile";
import AppContext from "../Contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/index";

function MainTabs() {
  const Tabs = createBottomTabNavigator();

  let isAuth = useSelector((state) => state.user.isAuth);

  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="MainStack"
        component={MainStack}
        options={{
          title: "Home",
          tabBarIcon: (icon) => <Ionicons name="home-outline" size={24} />,
        }}
      />
      <Tabs.Screen
        name="FavoriteStack"
        component={FavoriteStack}
        options={{
          title: "Favorite",
          tabBarIcon: (icon) => <Ionicons name="heart-outline" size={24} />,
        }}
      />
      {isAuth && (
        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            tabBarIcon: (icon) => <Ionicons name="person-outline" size={24} />,
          }}
        />
      )}
    </Tabs.Navigator>
  );
}

export default MainTabs;
