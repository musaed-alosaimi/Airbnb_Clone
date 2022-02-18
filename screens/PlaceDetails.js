import React from "react";
import { View, StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { Image, ScrollView } from "react-native";
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import Network_IP from "../config";
import { useSelector } from "react-redux";

function PlaceDetails(props) {
  let { navigation, route } = props;
  let placeItem = route.params.place;

  let profile = useSelector((state) => state.user.profile);
  let token = useSelector((state) => state.user.jwtToken);

  function bookPlace() {
    let { place } = route.params;

    fetch(`http://${Network_IP}:3000/api/v1/properties/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: profile.id, place_id: place.id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonRes) => {
        alert(JSON.stringify(jsonRes));
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#FFF",
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <Image
        source={{
          uri: placeItem.image,
        }}
        style={{ width: "100%", height: 300 }}
      />

      <View style={styles.BriefBox}>
        <Text category="h3">{placeItem.name}</Text>
        <Text stlye={{ marginVertical: 15, flex: 1 }} category="p1">
          {placeItem.desc}
        </Text>
        <View style={{ flexDirection: "row", paddingVertical: 10, flex: 1 }}>
          <Text category="h6" style={{ paddingRight: 10 }}>
            <Ionicons name="cash-outline" size={24} color="#3a32ff" />
            {placeItem.price}
          </Text>
          <Text category="h6" style={{ paddingRight: 10 }}>
            <Ionicons
              name="navigate-circle-outline"
              size={24}
              color="#3a32ff"
            />
            {placeItem.location}
          </Text>
          <Text category="h6" style={{ paddingRight: 10 }}>
            <Ionicons
              name="star-half-outline"
              size={24}
              color="#3a32ff"
              style={{ paddingHorizontal: 10 }}
            />
            {placeItem.quality}
          </Text>
        </View>
      </View>
      <Button
        onPress={() => {
          bookPlace();
        }}
      >
        Book
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  BriefBox: {
    flex: 1,
    marginHorizontal: 25,
    top: -125,
    padding: 20,
    backgroundColor: "#CCC",
    borderRadius: 15,
    opacity: 0.9,
  },
});

export default PlaceDetails;
