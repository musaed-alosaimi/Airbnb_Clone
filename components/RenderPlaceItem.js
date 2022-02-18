import React, { useContext } from "react";
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, Layout, Button } from "@ui-kitten/components";
import Network_IP from "../config";
import MainTabsContext from "../Contexts/MainTabsContext";
import { actions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../screens/Profile";

function RenderPlaceItem(props) {
  let { navigation, object, stack, longPress } = props;
  let item = object.item;

  let dispatch = useDispatch();

  let navigateTo = stack === "main" ? "PlaceDetails" : "PlaceDetailsFav";

  let profile = useSelector((state) => state.user.profile);
  let token = useSelector((state) => state.user.jwtToken);

  return (
    <TouchableOpacity
      style={{ borderWidth: 1, borderColor: "#CCC", margin: 10 }}
      onPress={() => navigation.navigate(navigateTo, { place: item })}
      onLongPress={() => longPress(item.id, profile.id)}
    >
      <ImageBackground
        source={{
          uri: item.image,
        }}
        style={{ width: "100%", height: 220 }}
      >
        <Text
          style={{
            padding: 5,
            fontSize: 24,
            backgroundColor: "#666",
            color: "#FFF",
            opacity: 0.8,
            position: "absolute",
            width: "100%",
            bottom: 0,
          }}
        >
          {item.name}
        </Text>
      </ImageBackground>

      <Layout
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Layout
          style={{
            padding: 15,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Layout style={{ flexDirection: "row" }}>
            <Ionicons name="navigate-circle-outline" size={32} color="#555" />
            <Text style={{ padding: 5, flexShrink: 1 }}>{item.location}</Text>
          </Layout>
          <Layout style={{ flexDirection: "row" }}>
            <Ionicons name="cash-outline" size={32} color="#555" />
            <Text style={{ padding: 5 }}>{item.price} SAR</Text>
          </Layout>
        </Layout>

        <Layout
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="star-half-outline" size={32} color="#555" />
          <Text style={{ padding: 5 }}>{item.quality}</Text>
        </Layout>
        {stack === "main" && (
          <Button
            style={{
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: "#CCC",
              borderWidth: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onPress={() => {
              fetch(`http://${Network_IP}:3000/api/v1/properties/fav`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  place_id: item.id,
                  user_id: profile.id,
                }),
              })
                .then((res) => res.json())
                .then((resData) => {
                  let dataObj = resData.data[0];
                  if (dataObj === Object(dataObj)) {
                    alert("Added to Favorite.");
                    dispatch(actions.AddFavPlace(dataObj));
                  }
                })
                .catch((err) => {
                  alert("Can't add it to the favorite list.");
                });
            }}
          >
            <Ionicons name="heart" size={32} color="#555" />
          </Button>
        )}
      </Layout>
    </TouchableOpacity>
  );
}

export default RenderPlaceItem;
