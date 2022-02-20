import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Icon, Button } from "@ui-kitten/components";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabs from "./navigators/MainTabs";
import BookedPlaces from "./screens/BookedPlaces";
import DrawerComponent from "./components/DrawerComponent";
import SignIn from "./screens/SignIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "./Contexts/AppContext";
import Network_IP from "./config";
import AboutUs from "./screens/AboutUs";
import ContactUs from "./screens/ContactUs";
import RightHeader from "./components/RightHeader";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import MainStore from "./store/index";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./store/index";

function App() {
  const Drawer = createDrawerNavigator();

  let auth, user, token;

  let SearchOn = useSelector((state) => state.SearchOn);
  let dispatch = useDispatch();
  let places = useSelector((state) => state.main.places);

  let [searchOn, setSearchOn] = useState(false);

  useEffect(async () => {
    auth = await AsyncStorage.getItem("auth");
    user = await AsyncStorage.getItem("user");
    token = await AsyncStorage.getItem("token");
    user = JSON.parse(user);

    try {
      let isAuth = auth === "true";

      if (isAuth) {
        dispatch(actions.isAuth(isAuth));
        dispatch(actions.Profile(user));
        dispatch(actions.jwtToken(token));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <DrawerComponent {...props} />}
        screenOptions={{
          headerRight: () => (
            <RightHeader>
              <Button
                status="basic"
                onPress={() => dispatch(actions.SearchOn(!SearchOn))}
              >
                <Ionicons name="search-outline" size={32} />
              </Button>
            </RightHeader>
          ),
        }}
      >
        <Drawer.Screen
          name="Home"
          component={MainTabs}
          options={{ headerTitle: "Airbnb" }}
        />
        <Drawer.Screen
          name="BookedPlaces"
          component={BookedPlaces}
          options={{
            headerTitle: "Booked Places",
            drawerLabel: "Booked Places",
          }}
        />
        <Drawer.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerTitle: "Sign In",
            drawerLabel: "Sign In",
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutUs}
          options={{
            headerTitle: "About",
            drawerLabel: "About",
          }}
        />
        <Drawer.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            headerTitle: "Contact Us",
            drawerLabel: "Contact Us",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default () => (
  <Provider store={MainStore}>
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor="#CCC"
        barStyle={"default"}
        showHideTransition={"fade"}
      />
      <ApplicationProvider {...eva} theme={eva.light}>
        <App />
      </ApplicationProvider>
    </SafeAreaView>
  </Provider>
);
