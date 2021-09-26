import React from "react";
import classes from "./Management.module.css";
import { Button, makeStyles } from "@material-ui/core";
// import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    background: "#6367EA",
    borderRadius: 5,
    border: 0,
    color: "white",
    height: 36,
    float: "right",
  },
});

const ManagePromotion = () => {
  const history = useHistory();
  const style = useStyles();

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const submitHandler = () => {
    history.push("/promotion/add");
  };

  return (
    <div className={classes.manageList}>
      <div className={classes.manageTitle}>
        Promotion Management
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={style.root}
          onClick={submitHandler}
        >
          Add Promotion
        </Button>
      </div>
      {/* <DataGrid
        autoHeight
        autoPageSize={true}
        checkboxSelection
        columns={columns}
        disableSelectionOnClick
        pageSize={10}
        rows={data}
      /> */}
    </div>
  );
};

export default ManagePromotion;
