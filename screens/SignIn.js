import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  Platform,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import * as eva from "@eva-design/eva";
import {
  Layout,
  Text,
  SafeAreaView,
  Avatar,
  Input,
  Button,
} from "@ui-kitten/components";
import resort_image from "../images/resort.jpg";
import Network_IP from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../Contexts/AppContext";
import { useDispatch } from "react-redux";
import { actions } from "../store/index";

function SignIn(props) {
  let { navigation } = props;

  let context = useContext(AppContext);

  let dispatch = useDispatch();

  let [usernameOrEmail, setUsernameOrEmail] = useState();
  let [password, setPassword] = useState();
  let [isAuth, setIsAuth] = useState(0);
  let [userID, setUserID] = useState();
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsAuth(0);
  }, []);

  function signInHandler() {
    setLoading(true);

    fetch(`http://${Network_IP}:3000/api/v1/auth/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username_or_email: usernameOrEmail, password }),
    })
      .then((response) => {
        // response.text();
        return response.json();
      })
      .then((jsonRes) => {
        switch (jsonRes.auth) {
          case false:
            setIsAuth(1);
            break;
          case true:
            setIsAuth(2);
            break;
        }

        if (jsonRes.auth) {
          let userRes = jsonRes.data;
          AsyncStorage.setItem("auth", "true");
          AsyncStorage.setItem("user", "" + JSON.stringify(userRes[0]));
          AsyncStorage.setItem("token", jsonRes.token);

          console.log(jsonRes.token);

          dispatch(actions.isAuth(true));
          dispatch(actions.Profile(jsonRes.data[0]));
          dispatch(actions.jwtToken(jsonRes.token));

          navigation.navigate("Home");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  let wrongInputStyle =
    isAuth === 1 ? { ...StyleSheet.flatten(styles.wrongInput) } : {};

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ borderWidth: 1, borderColor: "#000", flex: 1 }}
      >
        {/* <Text>{isAuth ? "Auth: true" : "Auth: false"}</Text> */}
        <Image source={resort_image} style={{ width: "100%", height: 250 }} />

        {loading && (
          <Text category="h3" style={{ textAlign: "center" }}>
            Loading ...
          </Text>
        )}

        <Layout style={{ padding: 20 }}>
          <Text category="h2" style={{ padding: 10, fontSize: 36 }}>
            Sign In
          </Text>
          <Input
            placeholder="Enter your username .."
            style={{ marginTop: 20, ...wrongInputStyle }}
            value={usernameOrEmail}
            onChangeText={(Text) => setUsernameOrEmail(Text)}
          />
          <Input
            placeholder="Enter your password .."
            style={{ marginTop: 20, ...wrongInputStyle }}
            secureTextEntry={true}
            value={password}
            onChangeText={(Text) => setPassword(Text)}
          />
          <Button style={{ marginTop: 20 }} onPress={signInHandler}>
            Sign In
          </Button>
          <Text
            style={{ textAlign: "center", margin: 30, color: "#AAA" }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Don't Have an Account? Register
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
}

let styles = StyleSheet.create({
  wrongInput: {
    borderColor: "red",
    borderWidth: 1,
  },
});

export default SignIn;
