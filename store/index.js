import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { startsWith } from "lodash";

let initialStateMain = {
  places: [],
  favPlaces: [],
  bookedPlaces: [],
  SearchOn: false,
};

let MainSlice = createSlice({
  name: "main",
  initialState: initialStateMain,
  reducers: {
    ShowPlaces: (state, action) => {
      state.places = action.payload;
    },
    ShowFavPlaces: (state, action) => {
      state.favPlaces = action.payload;
    },
    ShowBookedPlaces: (state, action) => {
      state.bookedPlaces = action.payload;
    },
    AddFavPlace: (state, action) => {
      state.favPlaces.push(action.payload);
    },
    DeleteFavPlace: (state, action) => {
      state.favPlaces = state.favPlaces.filter(
        (place) => parseInt(place.id) !== parseInt(action.payload)
      );
    },
    SearchOn: (state, action) => {
      state.SearchOn = action.payload;
    },
  },
});

let initialStateUser = {
  profile: { id: "", username: "", email: "", phone: "", city: "" },
  isAuth: false,
  jwtToken: "",
};

let UserSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    Profile: (state, action) => {
      state.profile = action.payload;
    },
    isAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    jwtToken: (state, action) => {
      state.jwtToken = action.payload;
    },
  },
});

let MainStore = configureStore({
  reducer: combineReducers({
    main: MainSlice.reducer,
    user: UserSlice.reducer,
  }),
});

export const actions = { ...MainSlice.actions, ...UserSlice.actions };
export default MainStore;

/*

total state after combining the reducers will be like this 

{
  main:  {
  places: [],
  favPlaces: [],
  SearchOn: false,
},

user:  {
  profile: { id: "", username: "", email: "", phone: "", city: "" },
  isAuth: false,
}

}

*/
