import Header from "./components/Header/Header";
import ProductsFilters from "./components/ProductsFilters/ProductsFilters";
import styles from "./App.module.scss";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";

function App(props) {
  const userExist = localStorage.getItem("user");
  if (!userExist) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.appWrapper}>
      <Header />
      <ProductsFilters />
      <Outlet />
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    setInitialProductstsList: (value) =>
      dispatch({ type: "SET_INITIAL_PRODUCTS_LIST", value: null }),
  };
};

export default connect(null, mapDispatchToProps)(App);
