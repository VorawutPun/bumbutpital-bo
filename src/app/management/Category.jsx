import React, { useState } from "react";
import classes from "./Management.module.css";
import { Backdrop, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
// import { DataGrid } from "@mui/x-data-grid";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import { Link } from "react-router-dom";
import { categoryData } from "../../dummyData";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: "#6367EA",
      borderRadius: 5,
      border: 0,
      color: "white",
      height: 36,
      float: "right",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const ManageCategory = () => {
  const style = useStyles();
  const [data, setData] = useState(categoryData);
  const [open, setOpen] = React.useState(false);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const columns = [
    {
      field: "id",
      headerName: "No.",
      width: 100,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 200,
    },
    {
      field: "username",
      headerName: "Add by",
      width: 200,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
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
              className={classes.manageListEdit}
            >
              Edit
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
        Categories Management
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={style.root}
          onClick={handleToggle}
        >
          Add Category
        </Button>
        <Backdrop className={style.backdrop} open={open}>
          <CategoryCard onClick={handleClose} />
        </Backdrop>
      </div>
      {/* <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        autoPageSize={true}
        autoHeight
      /> */}
    </div>
  );
};

export default ManageCategory;
