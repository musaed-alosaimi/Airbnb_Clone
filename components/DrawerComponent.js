import React, { useContext, useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Layout, Text, Button, Avatar } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";
import AppContext from "../Contexts/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/index";

function DrawerComponent(props) {
  let { navigation } = props;

  let isAuth = useSelector((state) => state.user.isAuth);

  let dispatch = useDispatch();

  useEffect(() => {});

  function signOutHandler() {
    AsyncStorage.setItem("auth", "false").then((err) => console.log(err));
    AsyncStorage.setItem("userID", "").then((err) => console.log(err));
    dispatch(actions.isAuth(false));
  }

  return (
    <DrawerContentScrollView {...props} style={{ flex: 1 }}>
      <View
        style={{
          minHeight: 200,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <Avatar
          source={require("../images/profile_image.jpeg")}
          style={{ width: 120, height: 120, marginTop: 20, marginBottom: 10 }}
        />
        <Text category="h5">Musaad Alosaimi</Text>
      </View>

      <View {...props}>
        <DrawerItem label="Home" onPress={() => navigation.navigate("Home")} />
        {isAuth && (
          <DrawerItem
            label="Booked Places"
            onPress={() => navigation.navigate("BookedPlaces")}
          />
        )}
        {!isAuth && (
          <DrawerItem
            label="Sign In"
            onPress={() => navigation.navigate("SignIn")}
          />
        )}

        <DrawerItem
          label="About Us"
          onPress={() => navigation.navigate("About")}
        />
        <DrawerItem
          label="Contact Us"
          onPress={() => navigation.navigate("ContactUs")}
        />

        {isAuth && <DrawerItem label="Sign Out" onPress={signOutHandler} />}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({});

export default DrawerComponent;
