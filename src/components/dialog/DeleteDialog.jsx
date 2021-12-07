import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DeleteDialog = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleDeleteFalse}>
      <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to delete the content "{props.title}" and all its data.
          Do you want to continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleDeleteFalse}>Cancel</Button>
        <Button color="secondary" onClick={props.handleDeleteTrue}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
