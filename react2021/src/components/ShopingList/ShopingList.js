import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { connect } from "react-redux";
import { Stack, Paper, Box } from "@mui/material";

function ShopingList({ productsFromRedux }) {
  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shoping List</p>
        <Stack spacing={2}>
          {productsFromRedux?.map((product, index) => (
            <Box key={product.id}>
              <Paper>{`${product.name}`}</Paper>
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
    // setLoadingAirportsState: (value) =>
    //   dispatch({ type: "SET_AIRPORTS_LOADING_STATE", value: value }),
    // setSelectedAirport: (value) =>
    //   dispatch({ type: "SET_SELECTED_AIRPORT", value: value }),
  };
};

const mapStateToProps = (state) => {
  // state - dane pochodzące z redux sotre'a
  return {
    productsFromRedux: state.products.shopingList,
    // airportsListLoadingStatus: state.airport.airportsIsLoading,
    // airportsListLoadingError: state.airport.loadingAirportsError,
    // airportsFromRedux - tak będzie się nazywał props wewnątrz komponentu
    // state.airport.airports - źródło danych które mają być dostępne jako "props.airportsFromRedux"
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopingList);