import Header from "./components/Header/Header";
import ProductsFilters from "./components/ProductsFilters/ProductsFilters";
import styles from "./App.module.scss";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";

function App() {
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

export default App;
