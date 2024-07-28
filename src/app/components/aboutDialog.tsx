import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({open,setOpen}:{open:boolean, setOpen:Function}) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Developed by William"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/jia831123/fun-location-app"><GitHubIcon/> jia831123/fun-location-app</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={'w-full'}  variant="outlined" onClick={handleClose}>確定</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}