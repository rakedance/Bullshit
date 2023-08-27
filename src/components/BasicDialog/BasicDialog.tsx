import { FC } from 'react';

import { BasicDialogProps } from './types';
import { CircularProgress, Dialog } from '@mui/material';
import { useAppSelector } from '../../redux/hooks/hooks';

export const BasicDialog: FC<BasicDialogProps> = ({children, handleClose, isOpen}) => {
  const {isAuthLoading} = useAppSelector(state => state.auth);
  if (isAuthLoading) return <CircularProgress color="inherit" />
  return (
    <>
    <Dialog open={isOpen} onClose={handleClose}>
        {children}
      </Dialog>
    </>
  );
};
