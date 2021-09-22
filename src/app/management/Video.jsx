import React, { useState } from "react";
import classes from "./Management.module.css";
import { Backdrop, Button, createStyles, makeStyles } from "@material-ui/core";
// import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Link as LinkMui } from "@material-ui/core";
import AddVideoCard from "../../components/addVideoCard/AddVideoCard";
import { videoData } from "../../dummyData";

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

const ManageVideo = () => {
  const style = useStyles();
  const [data, setData] = useState(videoData);
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
      width: 190,
    },
    {
      field: "title",
      headerName: "Title",
      width: 300,
    },
    {
      field: "username",
      headerName: "Add by",
      width: 300,
    },
    {
      field: "link",
      headerName: "Link",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <LinkMui href={params.row.link} className={classes.manageListEdit}>
              Link
            </LinkMui>
          </>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
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
        Video Management
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={style.root}
          onClick={handleToggle}
        >
          Add Video
        </Button>
        <Backdrop className={style.backdrop} open={open} >
          <AddVideoCard onClick={handleClose}/>
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

export default ManageVideo;