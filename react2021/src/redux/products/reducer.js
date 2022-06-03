import { initialProductState } from "./initialState";

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case "SET_INITIAL_PRODUCTS_LIST":
      return { ...state, productsList: action.value };
    case "ADD_PRODUCT_TO_SHOPPING_LIST":
      return { ...state, shopingList: action.value };
    default:
      return state;
  }
};
