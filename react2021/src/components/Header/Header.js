import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { connect } from "react-redux";
import axios from "axios";

function Header(props) {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));

  const setInitialValues = async () => {
    try {
      // props.setLoadingAirportsState("loading");
      const response = await axios.get(`http://localhost:9000/products`);
      props.setInitialProductsList(response.data);
      // props.setLoadingAirportsState("initial");
    } catch (e) {
      // props.setLoadingAirportsState("error");
      // props.setLoadingAirportsError(e.message);
      console.log("ERROR", e);
    }
  };


  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
        <Typography sx={{ m: 2 }} variant="h5">
          Zalogowany:{" "}
          {`${currentUser.userfirstName} ${currentUser.userLastName}`}
        </Typography>
        <Button variant="contained" onClick={setInitialValues}>Załaduj lotniska</Button>
        <Link to="/">
          <Button variant="contained" color="error">
            Wyloguj
          </Button>
        </Link>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInitialProductsList: (value) =>
      dispatch({ type: "SET_INITIAL_PRODUCTS_LIST", value: value }),
    //   setLoadingAirportsState: (value) =>
    //     dispatch({ type: "SET_AIRPORTS_LOADING_STATE", value: value }),
    //   setLoadingAirportsError: (value) =>
    //     dispatch({ type: "SET_AIRPORTS_LOADING_ERROR", value: value }),
  };
};

export default connect(null, mapDispatchToProps)(Header);