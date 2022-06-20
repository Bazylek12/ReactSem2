import React, { useState, useEffect, useRef } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { connect, useDispatch } from "react-redux";
import { Stack, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import { Span } from '../ProductsList/styles'
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
    if (keyBoardDetails) {

      console.log(productsFromRedux[0])
    }
  }, [arrowUpPressed, arrowDownPressed, keyBoardDetails]);


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
        <Stack spacing={2}>
          {productsFromRedux?.map((product, index) => (
            <Box key={index} >
              {loadingProductId === product.id ? <CircularProgress id="productSpinner" /> :
                <Span active={index === selectedIndex ? true : false}
                  id="product"
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
                </Span>}
            </Box>
          ))}
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
  };
};

const mapStateToProps = (state) => {
  return {
    productsFromRedux: state.products.filteredList,
    selectedIndex: state.products.selectedIndex,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);