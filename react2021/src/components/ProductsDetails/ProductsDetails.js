import React, { useState } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getSelectedProduct } from "../../redux/products/selectors";


function ProductDetails() {
  let navigate = useNavigate();


  const goBackToAirportsList = () => {
    navigate(-1);
  }

   const productDetails = useSelector((store) => getSelectedProduct(store));


  return (
    <>
    
      <ArrowBackIcon onClick={goBackToAirportsList} fontSize="large" />
      <div className={commonColumnsStyles.App}>
        <header className={commonColumnsStyles.AppHeader}>
          <p>Products Details</p>
          {productDetails && (
            <>
              <span>Nazwa: {productDetails.name}</span>
              <span>Kategoria: {productDetails.category}</span>
              <span>Jedzenie?: {productDetails.isFood ? ("Tak") : ("Nie")}</span>
            </>
           )} 
        </header>
      </div>
    </>
  );
}

// const mapStateToProps = (store) => {
//   return {
//     getAirportById: (id) => getAirportByIdSelector(store, id),
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeAirportById: (id) =>
//       dispatch({ type: "REMOVE_AIRPORT_BY_ID", value: id }),
//   };
// };

export default ProductDetails;
// export default connect(mapStateToProps)AirportDetails;