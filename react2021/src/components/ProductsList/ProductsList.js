import React, { useState, useEffect } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { connect, useDispatch } from "react-redux";
import { Stack, Paper, Box } from "@mui/material";
import axios from "axios";
import ShopingList from "../ShopingList/ShopingList";
import { useNavigate } from "react-router";
import styles from "./ProductsList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import useKeyPress from "../../hooks/useKeyPress";


function ProductsList({
  productsFromRedux,
  addToShopingList,
  setSelectedProduct,
  setLoadingProductStatus,
  selectedIndex,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingProductId, setloadingProductId] = useState(null);
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const keyBoardDetails = useKeyPress('d');

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: "ARROW_UP" });
      }
    if (arrowDownPressed) {
      dispatch({ type: "ARROW_DOWN" });
      }
  }, [arrowUpPressed, arrowDownPressed]);


  const addProduct = async (product) => {
    try {
      setLoadingProductStatus("loading")
      const response = await axios.post(`http://localhost:9000/products/shopingList/new`, product);
      addToShopingList(response.data);
      setLoadingProductStatus("initial")
    } catch (err) {
      console.log(err);
    }
  };

  const showDetails = async (product) => {
    try {
      setloadingProductId(product.id)
      const response = await axios.get(`http://localhost:9000/products/${product.id}`);
      setSelectedProduct(response.data);
      setloadingProductId(null)
      navigate(`/product/details/${product.id}`)
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {/* Poniżej znajduje się ostylowany aktywny produkt do zadania 5
        <span
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
            <Box key={index}>
              {loadingProductId === product.id ? <CircularProgress /> :
                <Paper
                sx={{
                  cursor: "pointer",
                  color: index === selectedIndex ? "red" : "black"
                }}
                tabIndex={0}
                role="button"
                aria-pressed={index === selectedIndex}
                  onClick={() => addProduct(product)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    showDetails(product)
                  }}
                >
                  {`${product.name}`}
                </Paper>}
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
      dispatch({ type: "SET_SELECTED_PRODUCT", value: value }),
    setLoadingProductStatus: (value) =>
      dispatch({ type: "SET_PRODUCTS_LOADING_STATE", value: value })
    // setSelectedAirport: (value) =>
    //   dispatch({ type: "SET_SELECTED_AIRPORT", value: value }),
  };
};

const mapStateToProps = (state) => {
  // state - dane pochodzące z redux sotre'a
  return {
    productsFromRedux: state.products.filteredList,
    selectedIndex: state.products.selectedIndex,
    // airportsListLoadingStatus: state.airport.airportsIsLoading,
    // airportsListLoadingError: state.airport.loadingAirportsError,
    // airportsFromRedux - tak będzie się nazywał props wewnątrz komponentu
    // state.airport.airports - źródło danych które mają być dostępne jako "props.airportsFromRedux"
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);