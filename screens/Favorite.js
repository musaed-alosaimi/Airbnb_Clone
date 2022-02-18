import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, Alert } from "react-native";
import { ApplicationProvider, Button, Layout } from "@ui-kitten/components";
import RenderPlaceItem from "../components/RenderPlaceItem";
import Network_IP from "../config";
import MainTabsContext from "../Contexts/MainTabsContext";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/index";

function Favorite(props) {
  let { navigation } = props;

  let [users, setUsers] = useState([]);

  let [placeDeleted, setPlaceDeleted] = useState(false);

  let favPlaces = useSelector((state) => state.main.favPlaces);
  let profile = useSelector((state) => state.user.profile);
  let token = useSelector((state) => state.user.jwtToken);
  let dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://${Network_IP}:3000/api/v1/properties/fav/${profile.id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((propertiesData) => {
        // console.log("Favorite Places : "+propertiesData.data);
        dispatch(actions.ShowFavPlaces(propertiesData.data));
      })
      .catch((ex) => {
        alert(ex);
      });
  }, []);

  let removeFromFav = (place_id, user_id) => {
    fetch(`http://${Network_IP}:3000/api/v1/properties/fav`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ place_id, user_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        let place = resData.data[0];

        if (resData.status === 200) {
          // Alert.alert(
          //   `Deleted Successfuly`,
          //   `The place "${place.name}" has been removed from favorite.`
          // );

          dispatch(actions.DeleteFavPlace(place.id));

          setPlaceDeleted(!placeDeleted);
        } else {
          alert(`There is problem in deleting the place.`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let longPressHandler = (placeID, userID) => {
    Alert.alert(
      "Remove from Favorite List",
      "Are sure you want to remove this place from your favorite ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => removeFromFav(placeID, userID),
          style: "default",
        },
      ]
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <FlatList
        data={favPlaces}
        renderItem={(object) => {
          return (
            <RenderPlaceItem
              navigation={navigation}
              object={object}
              key={object.item.id}
              stack="fav"
              longPress={longPressHandler}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </Layout>
  );
}

export default Favorite;
