import { initialProductState } from "./initialState";

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case "SET_INITIAL_PRODUCTS_LIST":
      return { 
        ...state, 
        productsList: action.value, 
        filteredList: action.value,
       };
    case "SET_SHOPING_LIST":
      return { ...state, shopingList: action.value };
    case "ADD_PRODUCT":
      return { ...state, shopingList: [...state.shopingList, action.value]}
    case "REMOVE_PRODUCT":
      return {
        ...state,
        shopingList: state.shopingList.filter(
          (product) => product.id !== action.value
        ),
      }
    case "FILTER_PRODUCTS_LIST":
       let filtered = state.productsList.filter((product) => 
        product.name.toLowerCase().includes(action.value.text.toLowerCase()))

        if (action.value.food) {
          filtered = filtered.filter(product => product.isFood)
        }
      return {
        ...state,
        filteredList: filtered
      }
    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.value };
    default:
      return state;
  }
};
