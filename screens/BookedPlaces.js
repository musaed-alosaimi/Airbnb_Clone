import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import RenderPlaceItem from "../components/RenderPlaceItem";
import Network_IP from "../config";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";

function BookedPlaces(props) {
  let profile = useSelector((state) => state.user.profile);
  let token = useSelector((state) => state.user.jwtToken);
  let bookedPlaces = useSelector((state) => state.main.bookedPlaces);

  let dispatch = useDispatch();

  let { navigation } = props;

  useEffect(() => {
    fetch(
      `http://${Network_IP}:3000/api/v1/properties/bookedPlaces/${profile.id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((jsonRes) => {
        console.log(jsonRes);
        dispatch(actions.ShowBookedPlaces(jsonRes.data));
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      <FlatList
        data={bookedPlaces}
        renderItem={(object) => {
          return (
            <RenderPlaceItem
              navigation={navigation}
              object={object}
              key={object.item.id}
              stack="main"
            />
          );
        }}
        numColumns={1}
        keyExtractor={(place) => place.id}
      />
    </Layout>
  );
}

export default BookedPlaces;
