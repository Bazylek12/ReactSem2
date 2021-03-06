import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { getSelectedProduct } from "../../redux/products/selectors";

function ProductDetails() {

    let navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const productDetails = useSelector((store) => getSelectedProduct(store));

    return (
        <>
            <ArrowBackIcon onClick={goBack} fontSize="large" id="goBack" />
            <div className={commonColumnsStyles.App}>
                <header className={commonColumnsStyles.AppHeader}>
                    <p>Products Details</p>
                    {
                        <>
                            <span id="productName">Nazwa: {productDetails.name}</span>
                            <span id="category">Kategoria: {productDetails.category}</span>
                            <span id="isFood">Jedzenie?: {productDetails.isFood ? ("Tak") : ("Nie")}</span>
                        </>
                    }

                </header>
            </div>
        </>
    );
}

export default ProductDetails;