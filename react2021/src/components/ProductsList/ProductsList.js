import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { connect } from "react-redux";
import { Stack, Paper, Box } from "@mui/material";
import axios from "axios";

function ProductsList({ productsFromRedux }, props) {


  const addProductToShoppingList = async (product) => {
    try {
      // props.setLoadingAirportsState("loading");
      // const response = await axios.post(`http://localhost:9000/products/shopingList/new`, product);
      const res = await axios.get(`http://localhost:9000/products/shopingList`);
      props.setShopingList(res.data);
      // props.setInitialProductsList(response.data);
      // props.setLoadingAirportsState("initial");
    } catch (e) {
      // props.setLoadingAirportsState("error");
      // props.setLoadingAirportsError(e.message);
      console.log("ERROR", e);
    }
  };

  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {/* Poniżej znajduje się ostylowany aktywny produkt do zadania 5 */}
        {/* <span
          style={{
            backgroundColor: "white",
            border: "1px black solid",
            borderRadius: "16px",
            padding: "6px",
          }}
        >
          Przykładowy aktywny produkt
        </span> */}
        <Stack spacing={2}>
          {productsFromRedux?.map((product, index) => (
            <Box key={product.id}>
              <Paper onClick={() => addProductToShoppingList(product)}>{`${product.name}`}</Paper>
            </Box>
          ))
          }

        </Stack>

      </header>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setShopingList: (value) =>
      dispatch({ type: "ADD_PRODUCT_TO_SHOPPING_LIST", value: value })
    // setSelectedAirport: (value) =>
    //   dispatch({ type: "SET_SELECTED_AIRPORT", value: value }),
  };
};

const mapStateToProps = (state) => {
  // state - dane pochodzące z redux sotre'a
  return {
    productsFromRedux: state.products.productsList,
    // airportsListLoadingStatus: state.airport.airportsIsLoading,
    // airportsListLoadingError: state.airport.loadingAirportsError,
    // airportsFromRedux - tak będzie się nazywał props wewnątrz komponentu
    // state.airport.airports - źródło danych które mają być dostępne jako "props.airportsFromRedux"
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);