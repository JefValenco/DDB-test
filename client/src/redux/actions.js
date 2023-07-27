import beerData from "../redux/beerData.json";

export const GET_BEERS = "GET_BEERS";
export const GET_TYPE = "GET_TYPE";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const GET_ALCOHOL = "GET_ALCOHOL";
export const ORDER_BY_ALCOHOL = "ORDER_BY_ALCOHOL";

export function getBeers() {
  return async function (dispatch) {
    try {
      const response = beerData;

      console.log(response);
      dispatch({ type: GET_BEERS, payload: response });
    } catch (error) {
      console.log("Error Get Beers Data", error);
    }
  };
}

export function getType() {
  return async function (dispatch) {
    try {
      const uniqueTypesSet = new Set();
      beerData.forEach((item) => uniqueTypesSet.add(item.type));

      const types = Array.from(uniqueTypesSet).map((type) => ({ type }));
      console.log(types);

      dispatch({ type: GET_TYPE, payload: types });
    } catch (error) {
      console.log("Error Get Beers Data", error);
    }
  };
}

export function FilterByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function OrderByAlcohol(payload) {
  return {
    type: "ORDER_BY_ALCOHOL",
    payload,
  };
}
