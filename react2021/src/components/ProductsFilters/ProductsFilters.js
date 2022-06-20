import React, { useState, useEffect } from "react";
import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { connect } from "react-redux";

function ProductsFilters({ filterProducts }) {

  const [text, setText] = useState("");
  const [food, setFood] = useState(false)

  useEffect(() => {
    filterProducts({ text: text, food: food })
  }, [text, food])
  return (
    <div className={styles.filtersHeaderWrapper}>
      <Typography variant="h4">Filtruj produkty: </Typography>
      <FormGroup>
        <div className={styles.filtersForm}>
          <FormControlLabel
            control={
              <TextField
                id="filter"
                margin="dense"
                label="Nazwa"
                variant="outlined"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Tylko produkty spożywcze"
            checked={food}
            onChange={() => setFood(!food)}
          />
        </div>
      </FormGroup>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterProducts: (value) =>
      dispatch({ type: "FILTER_PRODUCTS_LIST", value: value }),
  };
};

export default connect(null, mapDispatchToProps)(ProductsFilters);
