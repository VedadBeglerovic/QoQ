import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useNavigate } from 'react-router-dom';

export default function MyDialog({
  open,
  props
}) {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/');
  }

  return (
    <Dialog open={open}>
      <DialogTitle>{props}</DialogTitle>
      <DialogContent>
        <button onClick={handleClick}>Play Again</button>
      </DialogContent>
    </Dialog>
  );
}
