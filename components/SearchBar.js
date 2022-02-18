import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "@ui-kitten/components";
import _, { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/index";

function SearchBar(props) {
  let { props_clone, setProperties } = props;
  let [searchText, setSearchText] = useState("");

  let dispatch = useDispatch();

  function searchHandler(text) {
    setSearchText(text);

    let filteredPlaces = props_clone[0].data.filter((place) => {
      //   console.log(place.name);
      return place.name.toLowerCase().includes(searchText.trim().toLowerCase());
    });

    let debounceSearch = debounce(() => {
      dispatch(actions.ShowPlaces(filteredPlaces));
    }, 600);

    debounceSearch();
  }

  return (
    <View>
      <Input
        placeholder="Search .."
        style={styles.searchBox}
        value={searchText}
        onChangeText={searchHandler}
      />
    </View>
  );
}

let styles = StyleSheet.create({
  searchBox: {
    margin: 10,
  },
});

export default SearchBar;
