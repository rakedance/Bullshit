import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {MouseEvent, useEffect, useState} from 'react'
import { createChangeModal } from '../../redux/actions/modalActions';
import BasicForm from '../BasicForm';
import BasicDialog from '../BasicDialog';
import { Snackbar } from '@mui/material';

export default function Header() {
  const dispatch = useAppDispatch();
  const {isOpen, modalType} = useAppSelector(state => state.modal)
  const {authUser, authError} = useAppSelector(state => state.auth);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    if (authError) {
      setSnackbarOpen(true);
      const timer = setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [authError]);

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleAuthButtonClick = ({target}: MouseEvent<HTMLButtonElement> & {target: {name: string}} ) => {
    dispatch(createChangeModal({isOpen: true, modalType: target.name}))
  }
  const handleClose = () => {
    dispatch(createChangeModal({isOpen: false, modalType: ''}))
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {!authUser && <>
            <Button onClick={handleAuthButtonClick} name={'sign-in'} color="inherit">Sign In</Button>
            <Button onClick={handleAuthButtonClick} name={'sign-up'} color="inherit">Sign Up</Button>
          </>}
          {authUser && <>
            <Button name={`${authUser.username}`} color="inherit">{authUser.username}</Button>
            <Button name={'sign-out'} color="inherit">Sign Out</Button>
          </>}
          <BasicDialog isOpen={isOpen} handleClose={handleClose}>
            <BasicForm formTitle={modalType}
            formSubTitle={`To ${modalType} fill out the form and press submit button`}
            actions={[
              {name: 'cancel', onClick: handleClose}, 
              {name: 'submit', type: 'submit'}]}>
            </BasicForm>
          </BasicDialog>
        </Toolbar>
      </AppBar>
      {authError && <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleToastClose}
        message={`${authError}`}
      />}
    </Box>
  );
}