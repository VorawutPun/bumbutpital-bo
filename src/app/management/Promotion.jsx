import React, { useState } from "react";
import classes from "./Management.module.css";
import { Button, makeStyles } from "@material-ui/core";
// import { DataGrid } from "@mui/x-data-grid";
import { Link, useHistory } from "react-router-dom";
import { promotionData } from "../../dummyData";


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
  const [data, setData] = useState(promotionData);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const submitHandler = () => {
    history.push("/promotion/add");
  };

  const columns = [
    {
      field: "id",
      headerName: "No.",
      width: 190,
    },
    {
      field: "promotion",
      headerName: "Promotion",
      width: 300,
    },
    {
      field: "hospital",
      headerName: "Hospital",
      width: 300,
    },
    {
      field: "expireDate",
      headerName: "Expire Date",
      width: 300,
    },
    {
      field: "admin",
      headerName: "Admin",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/posts/" + params.row.id}
              className={classes.manageListDetail}
            >
              View Detail
            </Link>
            <Link
              to={"/posts/" + params.row.id}
              className={classes.manageListDelete}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Link>
          </>
        );
      },
    },
  ];

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
