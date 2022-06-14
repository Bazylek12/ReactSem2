import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { connect, useDispatch } from "react-redux";
import { Stack, Paper, Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

function ShopingList({ shopingListFromRedux, setShopingList }) {
  let { id } = useParams();

  const dispatch = useDispatch();

  const getShoppingList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/products/shopingList"
      );
      dispatch({ type: "SET_SHOPING_LIST", value: response.data})
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
       await axios.delete(`http://localhost:9000/products/shopingList/${productId}`);
        dispatch({ type: "REMOVE_PRODUCT", value: productId})

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shoping List</p>
        <Stack spacing={2}>
          {shopingListFromRedux?.map((product, index) => (
            <Box key={index}>
              <Paper onClick={() => deleteProduct(product.id)}>{`${product.name}`}</Paper>
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
      dispatch({ type: "SET_SHOPING_LIST", value: value }),
    // setSelectedAirport: (value) =>
    //   dispatch({ type: "SET_SELECTED_AIRPORT", value: value }),
  };
};

const mapStateToProps = (state) => {
  // state - dane pochodzące z redux sotre'a
  return {
    shopingListFromRedux: state.products.shopingList,
    // airportsListLoadingStatus: state.airport.airportsIsLoading,
    // airportsListLoadingError: state.airport.loadingAirportsError,
    // airportsFromRedux - tak będzie się nazywał props wewnątrz komponentu
    // state.airport.airports - źródło danych które mają być dostępne jako "props.airportsFromRedux"
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopingList);