import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Layout, Avatar, Text, Input, Button } from "@ui-kitten/components";
import Network_IP from "../config";
import AppContext from "../Contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/index";

function Profile(props) {
  let profile = useSelector((state) => state.user.profile);
  let token = useSelector((state) => state.user.jwtToken);
  let dispatch = useDispatch();

  let [username, setUsername] = useState();
  let [city, setCity] = useState();
  let [email, setEmail] = useState();
  let [phone, setPhone] = useState();

  useEffect(() => {
    fetch(`http://${Network_IP}:3000/api/v1/users/${profile.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        // console.log(jsonData);
        let currentUser = jsonData.data[0];
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setCity(currentUser.city);
        setPhone(currentUser.phone);
        dispatch(actions.Profile(currentUser));
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  let newUserInfo = {
    username,
    email,
    city,
    phone,
  };

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center" }}>
        <Avatar
          source={require("../images/profile_image.jpeg")}
          style={{
            width: 150,
            height: 150,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <Input
          value={username}
          style={{ marginVertical: 15 }}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          value={email}
          style={{ marginVertical: 15 }}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          value={"" + phone}
          style={{ marginVertical: 15 }}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          value={city}
          style={{ marginVertical: 15 }}
          onChangeText={(text) => setCity(text)}
        />
        <Button
          onPress={() => {
            dispatch(actions.UpdateProfile(newUserInfo));
          }}
        >
          Update
        </Button>
      </ScrollView>
    </Layout>
  );
}

export default Profile;
