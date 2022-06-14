import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { connect, useDispatch } from "react-redux";
import { Stack, Paper, Box } from "@mui/material";
import axios from "axios";
import ShopingList from "../ShopingList/ShopingList";
import { useNavigate } from "react-router";

function ProductsList({ productsFromRedux, addToShopingList, setSelectedProduct }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProduct = async (product) => {
    console.log();
    try {
      const response = await axios.post(
        "http://localhost:9000/products/shopingList/new",
        product
      );

      addToShopingList(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const showDetails = async (product) => {
    try {
      const response = await axios.get(`http://localhost:9000/products/${product.id}`);
      setSelectedProduct(response.data);
      navigate(`/product/details/${product.id}`)
    } catch (err) {
      console.log(err);
    }
  }
  
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
              <Paper 
                onClick={() => addProduct(product)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  showDetails(product)
                }}
                >
                {`${product.name}`}
              </Paper>
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
    addToShopingList: (value) =>
      dispatch({ type: "ADD_PRODUCT", value: value }),
    setSelectedProduct: (value) => 
      dispatch({type: "SET_SELECTED_PRODUCT", value: value})
    // setSelectedAirport: (value) =>
    //   dispatch({ type: "SET_SELECTED_AIRPORT", value: value }),
  };
};

const mapStateToProps = (state) => {
  // state - dane pochodzące z redux sotre'a
  return {
    productsFromRedux: state.products.filteredList,
    // airportsListLoadingStatus: state.airport.airportsIsLoading,
    // airportsListLoadingError: state.airport.loadingAirportsError,
    // airportsFromRedux - tak będzie się nazywał props wewnątrz komponentu
    // state.airport.airports - źródło danych które mają być dostępne jako "props.airportsFromRedux"
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);