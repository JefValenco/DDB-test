import {
  GET_BEERS,
  GET_TYPE,
  FILTER_BY_TYPE,
  GET_ALCOHOL,
  ORDER_BY_ALCOHOL,
} from "./actions";

const initialState = {
  beers: [],
  beerType: [],
  beerAlcohol: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BEERS:
      return {
        ...state,
        beers: action.payload,
        allBeers: action.payload,
      };

    case GET_TYPE:
      return {
        ...state,
        beerType: action.payload,
      };

    case GET_ALCOHOL:
      return {
        ...state,
        beerAlcohol: action.payload,
      };

    case FILTER_BY_TYPE:
      const allBeers = state.allBeers;
      const filteredBeers =
        action.payload === "clear"
          ? allBeers
          : allBeers.filter((el) => el.type === action.payload);
      return {
        ...state,
        beers: filteredBeers,
      };

    case ORDER_BY_ALCOHOL:
      const allItems = state.allBeers;
      let sortedItems;
      if (action.payload === "high") {
        sortedItems = state.beers.slice().sort(function (a, b) {
          return b.alcoholPercentage - a.alcoholPercentage;
        });
      } else if (action.payload === "low") {
        sortedItems = state.beers.slice().sort(function (a, b) {
          return a.alcoholPercentage - b.alcoholPercentage;
        });
      } else if (action.payload === "clear") {
        sortedItems = allItems;
      }

      return { ...state, beers: sortedItems };

    default:
      return state;
  }
};

export default rootReducer;
