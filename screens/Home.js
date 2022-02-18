import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Text, Layout, Input } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import RenderPlaceItem from "../components/RenderPlaceItem";
import Network_IP from "../config";
import SearchBar from "../components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@ui-kitten/components";
import { actions } from "../store/index";
import axios from "axios";

let props_clone = [];

function Home(props) {
  let { navigation } = props;
  let [refresh, setRefresh] = useState(false);

  let user = useSelector((state) => state.user.profile);
  let token = useSelector((state) => state.user.jwtToken);

  let SearchOn = useSelector((state) => state.main.SearchOn);
  let places = useSelector((state) => state.main.places);

  let [loading, setLoading] = useState(true);

  let dispatch = useDispatch();

  useEffect(async () => {
    try {
      let propertiesData = await axios.get(
        `http://${Network_IP}:3000/api/v1/properties`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      let response = propertiesData.data;

      props_clone = [].concat(response.data);

      dispatch(actions.ShowPlaces(response.data));

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      {SearchOn && <SearchBar props_clone={props_clone} />}

      {loading && <Text category="h3">Loading ..</Text>}

      <FlatList
        data={places}
        renderItem={(object) => {
          return (
            <RenderPlaceItem
              navigation={navigation}
              object={object}
              kery={object.item.id}
              stack="main"
            />
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default Home;
